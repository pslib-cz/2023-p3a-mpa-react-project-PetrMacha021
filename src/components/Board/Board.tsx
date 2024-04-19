import Styles from "./Board.module.css";
import {board} from "../../data/Examples";
import BoardTile from "./Tile/BoardTile.tsx";

export default function Board() {
  return <div className={Styles.board}>
    {board.tiles.map((row, y) =>
        row.map((tile, x) => <BoardTile tile={tile} x={x} y={y} key={`${x.toString()}${y.toString()}`} />)
    )}
  </div>;
}
