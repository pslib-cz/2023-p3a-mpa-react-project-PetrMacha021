import {Level} from "./Level.ts";
import {Tile} from "./Tile.ts";
import {BoardPiece} from "../../providers/BoardProvider.tsx";

export interface GameState {
  levels: Level[]
}

export interface BoardState {
  tiles: Tile[][];
  pieces: BoardPiece[];
  hoveredPiece: BoardPiece | null;
}
