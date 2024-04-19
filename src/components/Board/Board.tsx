import Styles from "./Board.module.css";
import {board} from "../../data/Examples";
import TileDisplay from "../Tile/TileDisplay.tsx";

export default function Board() {
  return <div className={Styles.board}>
    {board.tiles.map((row, y) =>
        row.map((tile, x) => <div key={`${x.toString()}${y.toString()}`} style={{
          gridRow: (y + 1).toString(),
          gridColumn: (x + 1).toString()
        }} className={Styles.tile}>
          <TileDisplay tile={tile}/>
        </div>)
    )}
  </div>;
}
