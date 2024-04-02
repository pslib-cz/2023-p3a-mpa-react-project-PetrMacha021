import {Board} from "./Board.ts";

export interface Level {
  id: number;
  name: string;
  board: Board;
  completed: boolean;
}
