import {BoardPiece} from "./Piece.ts";

export interface Board {
  pieces: BoardPiece[];
  size: { x: number, y: number };
}
