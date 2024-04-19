import {createFileRoute} from "@tanstack/react-router";
import Board from "../../components/Board/Board.tsx";
import PieceDisplay from "../../components/Piece/PieceDisplay.tsx";
import {board, L_SHAPE} from "../../data/Examples.ts";
import Styles from "./level.module.css";
import {Collision, CollisionDetection, DndContext, DragEndEvent} from "@dnd-kit/core";
import {Tile} from "../../data/types/Tile.ts";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import {useContext, useEffect} from "react";

export const Route = createFileRoute('/level/$id')({
  component: Component
});

const collisionDetection: CollisionDetection = (args) => {
  const collisions: Collision[] = [];
  const {droppableRects, collisionRect, droppableContainers} = args;

  for (const container of droppableContainers) {
    const rect = droppableRects.get(container.id);
    if (!rect) continue;
    if (rect.top < collisionRect.bottom && rect.bottom > collisionRect.top && rect.left < collisionRect.right && rect.right > collisionRect.left) {
      collisions.push({id: container.id, data: {container}});
    }
  }

  return collisions;
};

function Component() {
  const {id} = Route.useParams();
  const { dispatch } = useContext(BoardContext);

  useEffect(() => {
    dispatch({type: "SET_TILES", tiles: board.tiles});
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (over) {
      const id = over.id.toString();
      const x = +id[0];
      const y = +id[1];
      console.log(`Dropped over ${x.toString()}, ${y.toString()}`);
      const tiles = active.data.current?.tiles as Tile[][];
      for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
          dispatch({type: "SET_TILE", tile: tiles[i][j], x: x + j, y: y + i});
        }
      }
      dispatch({type: "SET_PIECES", pieces: [{x, y, tiles}]});
    }
  };

  return <>
    <h1>Level {id}</h1>
    <div className={Styles.game}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={collisionDetection}>
          <Board/>
          <PieceDisplay piece={L_SHAPE}/>
      </DndContext>
    </div>
  </>;
}
