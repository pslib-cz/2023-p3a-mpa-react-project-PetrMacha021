import {createFileRoute} from "@tanstack/react-router";
import Board from "../../components/Board/Board.tsx";
import PieceDisplay from "../../components/Piece/PieceDisplay.tsx";
import {L_SHAPE} from "../../data/Examples.ts";
import Styles from "./level.module.css";

export const Route = createFileRoute('/level/$id')({
  component: Component
});

function Component() {
  const {id} = Route.useParams();
  return <>
    <h1>Level {id}</h1>
    <div className={Styles.game}>
      <Board/>
      <PieceDisplay piece={L_SHAPE}/>
    </div>
  </>;
}
