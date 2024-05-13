import Styles from "./BoardTile.module.css";
import TileStyles from "../../Piece/PieceDisplay.module.css";
import {useDroppable} from "@dnd-kit/core";


export default function BoardTile({x, y}: {
  x: number;
  y: number;
}) {
  const {isOver, setNodeRef} = useDroppable({
    id: `${x.toString()}${y.toString()}`,
  });

  return <div className={`${Styles.tile}, ${TileStyles.tile}`} ref={setNodeRef} style={{
    gridRow: (y + 1).toString(),
    gridColumn: (x + 1).toString(),
    backgroundColor: isOver ? 'lightgreen' : undefined,
  }}>
  </div>;
}
