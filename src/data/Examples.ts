import {Board} from "./types/Board.ts";
import {DOWN_RIGHT, EMPTY, LEFT_RIGHT, UP_DOWN} from "./types/Tile.ts";
import {Piece} from "./types/Piece.ts";

export const board: Board = {
  tiles: [
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  ]
};

export const L_SHAPE: Piece = {
  id: 1,
  tiles: [
    [DOWN_RIGHT, LEFT_RIGHT],
    [UP_DOWN, EMPTY],
  ]
};
