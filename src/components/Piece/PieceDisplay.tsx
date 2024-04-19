import {Piece} from '../../data/types/Piece';
import TileDisplay from "../Tile/TileDisplay.tsx";
import Styles from "./PieceDisplay.module.css";

export default function PieceDisplay({piece}: { piece: Piece }) {
  return (
    <div className={Styles.piece}>
      {piece.tiles.map((row, i) => {
          return row.map((tile, j) => {
            return <div key={`${i.toString()}${j.toString()}`} style={{
              gridRow: (i + 1).toString(),
              gridColumn: (j + 1).toString()
            }} className={Styles.tile}>
              <TileDisplay tile={tile}/>
            </div>;
          });
        }
      )}
    </div>
  );
}
