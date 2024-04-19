import Styles from "./Board.module.css";
import BoardTile from "./Tile/BoardTile.tsx";
import {useContext, useEffect, useState} from "react";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import {Tile} from "../../data/types/Tile.ts";
import ShadowBoard from "./Shadow/ShadowBoard.tsx";

export default function Board() {
  const {state} = useContext(BoardContext);

  const [board, setBoard] = useState([] as Tile[][]);

  useEffect(() => {
    console.log(state.tiles);
    setBoard(state.tiles);
  }, [state.tiles]);

  return <div className={Styles.board}>
    <ShadowBoard x={3} y={3} />
    {board.map((row, y) =>
      row.map((tile, x) => <BoardTile tile={tile} x={x} y={y} key={`${x.toString()}${y.toString()}`} />)
    )}
  </div>;
}
