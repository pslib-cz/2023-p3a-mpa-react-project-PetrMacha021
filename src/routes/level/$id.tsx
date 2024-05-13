import {createFileRoute, Link, redirect} from "@tanstack/react-router";
import Styles from "./level.module.css";
import {Collision, CollisionDetection, DndContext, DragEndEvent} from "@dnd-kit/core";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import {useContext, useEffect, useState} from "react";
import {Board} from "../../components/Board/Board.tsx";
import {Tile} from "../../data/types/Tile.ts";
import Magazine from "../../components/Magazine/Magazine.tsx";
import {GameContext} from "../../providers/GameProvider.tsx";
import { Route as IndexRoute } from "../index.tsx";
import Debug from "../../Debug.ts";

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
  const {state: gameState, dispatch: gameDispatch} = useContext(GameContext);
  const [isCompleted, setCompleted] = useState(false);
  const [isNextLevel, setNextLevel] = useState(false);

  useEffect(() => {
    const level = gameState.levels.find(level => level.id === parseInt(id));
    if (!level) {
      redirect({
        to: "/",
      });
      return;
    }
    dispatch({type: "LOAD_LEVEL", level});
    setCompleted(level.completed);
    setNextLevel(gameState.levels.find(level => level.id === parseInt(id) + 1) !== undefined);
  }, [dispatch, gameState.levels, id]);

  useEffect(() => {
    if (!isCompleted) return;
    dispatch({type: "LOCK_LEVEL"});
  }, [isCompleted]);

  useEffect(() => {
    if (isCompleted) return;
    let complete = true;
    if (state.board.pieces.length === 0) return;
    if (state.board.pieces.length !== state.pieces.length) return;
    for (const piece of state.board.pieces) {
      const p = state.pieces.find(p => p.uid === piece.uid);
      if (!p) {
        Debug(`❗ Piece ${piece.uid} not found`);
        complete = false;
        break;
      }

      Debug(`Checking piece ${piece.uid} at x:${p.x.toString()} y:${p.y.toString()}`);

      if (piece.x !== p.x || piece.y !== p.y) {
        Debug(`❗ Piece ${piece.uid} is in x:${p.x.toString()} y:${p.y.toString()} instead of x:${piece.x.toString()} y:${piece.y.toString()}`);
        complete = false;
        break;
      }
    }

    if (complete) {
      gameDispatch({type: "COMPLETE_LEVEL", level: parseInt(id)});
      setCompleted(true);
      setNextLevel(gameState.levels.find(level => level.id === parseInt(id) + 1) !== undefined);
    }
  }, [state.pieces]);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (over) {
      Debug("Active object", active);
      Debug("Dropped on", over);
      if (over.id === "destroyer") {
        const activeId = active.id.toString();
        const x = +activeId[0];
        const y = +activeId[1];
        if (activeId.length === 1) return;
        dispatch({type: "REMOVE_PIECE", x, y});
        return;
      }
      const id = over.id.toString();
      const x = +id[0];
      const y = +id[1];
      const tiles = active.data.current?.tiles as Tile[][];
      Debug(`Dropped over ${x.toString()}, ${y.toString()}`);

      if (active.id.toString().length == 2) {
        dispatch({type: "MOVE_PIECE", x: parseInt(id[0]), y: parseInt(id[1]), newX: x, newY: y});
      } else {
        dispatch({type: "ADD_PIECE", piece: {uid: active.data.current?.uid as string, x, y, tiles, locked: false}});
      }
    }
  };

  return <>
    <Link to={IndexRoute.to} className={"btn btn-secondary"}>Back</Link>
    {isCompleted && isNextLevel && <Link className={"btn btn-primary"} to={"/level/$id"} params={{
      id: (parseInt(id) + 1).toString()
    }}>Next Level</Link>}
    <h2>Level {id}</h2>
    {isCompleted && <p>Level completed!</p>}
    <div className={Styles.game}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={collisionDetection}>
        <Board/>
        <Magazine/>
      </DndContext>
    </div>
  </>;
}
