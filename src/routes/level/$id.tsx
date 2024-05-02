import {createFileRoute} from "@tanstack/react-router";
import Styles from "./level.module.css";
import {Collision, CollisionDetection, DndContext, DragEndEvent} from "@dnd-kit/core";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import {useContext, useEffect} from "react";
import {Board} from "../../components/Board/Board.tsx";
import {Tile} from "../../data/types/Tile.ts";
import Magazine from "../../components/Magazine/Magazine.tsx";
import {GameContext} from "../../providers/GameProvider.tsx";

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
  const {state, dispatch} = useContext(BoardContext);
  const {dispatch: gameDispatch} = useContext(GameContext);

  useEffect(() => {
    dispatch({type: "LOAD_LEVEL", level: parseInt(id)});
  }, [dispatch, id]);

  useEffect(() => {
    // Check if the level is complete
    let complete = true;
    if (state.board.pieces.length === 0) return;
    if (state.board.pieces.length !== state.pieces.length) return;
    for (const piece of state.board.pieces) {
      const p = state.pieces.find(p => p.uid === piece.uid);
      if (!p) {
        console.log(`❗ Piece ${piece.uid} not found`);
        complete = false;
        break;
      }

      console.log(`Checking piece ${piece.uid} at ${piece.x.toString()}, ${piece.y.toString()} against ${p.x.toString()}, ${p.y.toString()}`);

      if (piece.x !== p.x || piece.y !== p.y) {
        console.log(`❗ Piece ${piece.uid} is in x:${p.x.toString()} y:${p.y.toString()} instead of x:${piece.x.toString()} y:${piece.y.toString()}`);
        complete = false;
        break;
      }
    }

    if (complete) {
      gameDispatch({type: "COMPLETE_LEVEL", level: parseInt(id)});
    }
  }, [state.pieces]);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (over) {
      const id = over.id.toString();
      const x = +id[0];
      const y = +id[1];
      const tiles = active.data.current?.tiles as Tile[][];
      console.log(active);
      console.log(`Dropped over ${x.toString()}, ${y.toString()}`);

      if (active.id.toString().length == 2) {
        dispatch({type: "MOVE_PIECE", x: parseInt(id[0]), y: parseInt(id[1]), newX: x, newY: y});
      } else {
        dispatch({type: "ADD_PIECE", piece: {uid: active.data.current?.uid as string, x, y, tiles, locked: false}});
      }
    }
  };

  return <>
    <h1>Level {id}</h1>
    <div className={Styles.game}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={collisionDetection}>
        <Board/>
        <Magazine/>
      </DndContext>
    </div>
  </>;
}
