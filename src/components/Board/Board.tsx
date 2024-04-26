import {BoardContext} from "../../providers/BoardProvider.tsx";
import {useContext, useEffect, useState} from "react";
import Styles from "./Board.module.css";
import {Tile} from "../../data/types/Tile.ts";
import PieceDisplay from "../Piece/PieceDisplay.tsx";
import BoardTile from "./Tile/BoardTile.tsx";

export function Board() {
  const {state} = useContext(BoardContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [pieces, setPieces] = useState([] as { x: number, y: number, tiles: Tile[][] }[]);

  useEffect(() => {
    if (state.tiles.length === 0) return;
    setX(state.tiles.length);
    setY(state.tiles[0].length);
  }, [state.tiles]);

  useEffect(() => {
    setPieces(state.pieces);
  }, [state.pieces]);

  return <div className={Styles.board}>
    {/*Logic*/}
    <div className={Styles.logicBoard} style={{
      gridTemplateColumns: `repeat(${y.toString()}, 1fr)`,
      gridTemplateRows: `repeat(${x.toString()}, 1fr)`
    }}>
      {pieces.map((piece, i) => (
        <div key={i} style={{
          gridColumn: `${(piece.x + 1).toString()} / span ${(piece.tiles[0].length).toString()}`,
          gridRow: `${(piece.y + 1).toString()} / span ${(piece.tiles.length).toString()}`
        }} className={Styles.piece}>
          <PieceDisplay piece={{id: `${piece.x.toString()}${piece.y.toString()}`, tiles: piece.tiles}} x={piece.x} y={piece.y}/>
        </div>
      ))}
    </div>
    {/*Render*/}
    <div className={Styles.renderBoard}>
      {state.tiles.map((row, y) => (
        <div key={y} className={Styles.row}>
          {row.map((_, x) => (
            <BoardTile key={x} x={x} y={y}/>
          ))}
        </div>
      ))}
    </div>
  </div>;
}
