import {BoardContext} from "../../providers/BoardProvider.tsx";
import {useContext, useEffect, useState} from "react";
import Styles from "./Board.module.css";
import PieceDisplay from "../Piece/PieceDisplay.tsx";
import BoardTile from "./Tile/BoardTile.tsx";
import {BoardPiece} from "../../data/types/Piece.ts";

export function Board() {
  const {state} = useContext(BoardContext);
  const [pieces, setPieces] = useState([] as BoardPiece[]);

  useEffect(() => {
    setPieces(state.pieces);
  }, [state.pieces]);

  return <div className={Styles.board}>
    {/*Logic*/}
    <div className={Styles.logicBoard} style={{
      gridTemplateColumns: `repeat(${state.board.size.y.toString()}, 1fr)`,
      gridTemplateRows: `repeat(${state.board.size.x.toString()}, 1fr)`
    }}>
      {pieces.map((piece, i) => (
        <div key={i} style={{
          gridColumn: `${(piece.x + 1).toString()} / span ${(piece.tiles[0].length).toString()}`,
          gridRow: `${(piece.y + 1).toString()} / span ${(piece.tiles.length).toString()}`
        }} className={Styles.piece}>
          <PieceDisplay piece={piece} />
        </div>
      ))}
    </div>
    {/*Render*/}
    <div className={Styles.renderBoard}>
      {Array.from({length: state.board.size.y}, (_, y) => (
        <div key={y.toString()} className={Styles.row}>
          {Array.from({length: state.board.size.x}, (_, x) => (
            <BoardTile key={`${x.toString()}${y.toString()}`} x={x} y={y}/>
          ))}
        </div>
      ))}
    </div>
  </div>;
}
