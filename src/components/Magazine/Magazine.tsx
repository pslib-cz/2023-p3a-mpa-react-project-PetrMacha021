import {useContext, useEffect, useState} from "react";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import PieceDisplay from "../Piece/PieceDisplay.tsx";
import Styles from "./Magazine.module.css";
import {BoardPiece} from "../../data/types/Piece.ts";

export default function Magazine() {
  const {state} = useContext(BoardContext);
  const [pieces, setPieces] = useState([] as BoardPiece[]);

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

  return <div className={Styles.container}>
    {pieces.map((piece, i) => (
      <div key={i} className={Styles.piece}>
        <PieceDisplay piece={piece} id={i.toString()}/>
      </div>
    ))}
  </div>;
}
