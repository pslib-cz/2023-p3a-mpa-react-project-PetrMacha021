import {Tile} from "./Tile.ts";

export interface Piece {
  id: number;
  tiles: Tile[][];
}
