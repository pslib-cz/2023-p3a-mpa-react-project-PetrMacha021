import TileDisplay from "../../Tile/TileDisplay.tsx";
import {Tile} from "../../../data/types/Tile.ts";
import Styles from "./BoardTile.module.css";
import {useDroppable} from "@dnd-kit/core";


export default function BoardTile({tile, x, y}: {
  tile: Tile;
  x: number;
  y: number;
}) {
  const {isOver, setNodeRef} = useDroppable({
    id: `${x.toString()}${y.toString()}`,
  });

  return <div className={Styles.tile} ref={setNodeRef} style={{
    gridRow: (y + 1).toString(),
    gridColumn: (x + 1).toString(),
    backgroundColor: isOver ? 'lightgreen' : undefined,
  }}>
    <TileDisplay tile={tile}/>
  </div>;
}
