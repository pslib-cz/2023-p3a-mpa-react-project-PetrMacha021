import {Connection} from "./Connection.ts";

export interface Tile {
  id: number;
  connection: Connection;
  start: boolean;
}
