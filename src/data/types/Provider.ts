import {Level} from "./Level.ts";
import {BoardPiece} from "./Piece.ts";
import {Board} from "./Board.ts";

export interface GameState {
  levels: Level[]
}

export interface BoardState {
  pieces: BoardPiece[];
  board: Board;
  hoveredPiece: BoardPiece | null;
}
