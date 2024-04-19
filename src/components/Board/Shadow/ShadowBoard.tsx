import Styles from "./ShadowBoard.module.css";
import {BoardContext} from "../../../providers/BoardProvider.tsx";
import {MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import {Tile} from "../../../data/types/Tile.ts";
import PieceDisplay from "../../Piece/PieceDisplay.tsx";

export default function ShadowBoard() {
  const {state} = useContext(BoardContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [pieces, setPieces] = useState([] as { x: number, y: number, tiles: Tile[][] }[]);

  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (state.tiles.length === 0) return;
    setX(state.tiles[0].length);
    setY(state.tiles.length);
  }, [state.tiles]);

  useEffect(() => {
    const pieces = state.pieces;
    setPieces(pieces);
  }, [state.pieces]);

  return <div ref={ref} className={Styles.shadowboard} style={{
    gridTemplateColumns: `repeat(${x.toString()}, 1fr)`,
    gridTemplateRows: `repeat(${y.toString()}, 1fr)`,
  }}>
    {pieces.map((piece, i) =>
      <div key={i} style={{
        gridArea: `${(piece.y + 1).toString()} / ${(piece.x + 1).toString()} / span ${piece.tiles.length.toString()} / span ${piece.tiles[0].length.toString()}`,
      }}>
        <PieceDisplay piece={{id: i, tiles: piece.tiles}} key={i.toString()}/>
      </div>
    )}
  </div>;
}
