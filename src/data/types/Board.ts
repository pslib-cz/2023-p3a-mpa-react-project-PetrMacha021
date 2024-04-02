import {Tile} from "./Tile.ts";

export interface Board {
  tiles: Tile[][];
  width: number;
  height: number;
}
