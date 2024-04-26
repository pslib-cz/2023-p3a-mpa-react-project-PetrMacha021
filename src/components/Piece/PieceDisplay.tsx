import {Piece} from '../../data/types/Piece';
import TileDisplay from "../Tile/TileDisplay.tsx";
import Styles from "./PieceDisplay.module.css";
import {useDraggable} from "@dnd-kit/core";
import {BoardContext} from "../../providers/BoardProvider.tsx";
import {useContext} from "react";

export default function PieceDisplay({piece, x, y}: { piece: Piece, x: number, y: number }) {
  const {dispatch} = useContext(BoardContext);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: piece.id.toString(),
    data: {
      tiles: piece.tiles
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x.toString()}px, ${transform.y.toString()}px, 0)`,
  } : undefined;

  return (
    <div className={Styles.piece} ref={setNodeRef} style={style} onMouseDown={() => {
      dispatch({type: "HOVER_PIECE", piece: {x, y, tiles: piece.tiles}});
    }} {...listeners} {...attributes}>
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
