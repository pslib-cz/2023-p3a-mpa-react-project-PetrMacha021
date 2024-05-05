import {useContext, useEffect, useState} from "react";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import PieceDisplay from "../Piece/PieceDisplay.tsx";
import Styles from "./Magazine.module.css";
import {BoardPiece} from "../../data/types/Piece.ts";
import {useDroppable} from "@dnd-kit/core";

export default function Magazine() {
  const {state} = useContext(BoardContext);
  const [pieces, setPieces] = useState([] as BoardPiece[]);
  const {isOver, setNodeRef} = useDroppable({
    id: "destroyer",
  });

  useEffect(() => {
    const pieces: BoardPiece[] = [];
    for (const piece of state.board.pieces) {
      console.log(piece);

      let found = false;
      for (const p of state.pieces) {
        console.log(p.uid, piece.uid);
        if (p.uid === piece.uid) {
          found = true;
          break;
        }
      }

      if (!found) {
        pieces.push(piece);
      }
    }

    setPieces(pieces);
  }, [state.board.pieces, state.pieces]);

  return <div className={Styles.container} ref={setNodeRef}
    style={{
      background: isOver ? 'linear-gradient(var(--container), var(--error), var(--container))' : undefined,
    }}>
    {pieces.map((piece, i) => (
      <div key={i} className={Styles.piece}>
        <PieceDisplay piece={piece} id={i.toString()}/>
      </div>
    ))}
  </div>;
}
