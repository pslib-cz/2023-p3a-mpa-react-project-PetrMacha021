import {Tile} from "./Tile.ts";

export interface Piece {
  id: string;
  tiles: Tile[][];
}

export interface BoardPiece {
  uid: string;
  x: number;
  y: number;
  tiles: Tile[][];
}
