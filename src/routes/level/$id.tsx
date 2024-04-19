import {createFileRoute} from "@tanstack/react-router";
import Board from "../../components/Board/Board.tsx";
import PieceDisplay from "../../components/Piece/PieceDisplay.tsx";
import {L_SHAPE} from "../../data/Examples.ts";
import Styles from "./level.module.css";
import {Collision, CollisionDetection, DndContext, DragEndEvent} from "@dnd-kit/core";

export const Route = createFileRoute('/level/$id')({
  component: Component
});

function handleDragEnd(event: DragEndEvent) {
  const {over} = event;

  if (over) {
    console.log('Dropped over:', over.id);
  }
}

const collisionDetection: CollisionDetection = (args) => {
  const collisions: Collision[] = [];
  const {droppableRects, collisionRect, droppableContainers} = args;

  for (const container of droppableContainers) {
    const rect = droppableRects.get(container.id);
    if (!rect) continue;
    if (rect.top < collisionRect.bottom && rect.bottom > collisionRect.top && rect.left < collisionRect.right && rect.right > collisionRect.left) {
      collisions.push({ id: container.id, data: {container} });
    }
  }

  return collisions;
};

function Component() {
  const {id} = Route.useParams();
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
