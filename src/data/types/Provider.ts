import {Level} from "./Level.ts";
import {Tile} from "./Tile.ts";

export interface GameState {
  levels: Level[]
}

export interface BoardState {
  tiles: Tile[][];
}
