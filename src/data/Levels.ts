import {DOWN_RIGHT, EMPTY, LEFT_RIGHT, UP_DOWN, UP_RIGHT} from "./types/Tile.ts";
import {Level} from "./types/Level.ts";

export const Levels: Level[] = [
  {
    id: 1,
    name: "Level 1",
    completed: false,
    board: {
      pieces: [
        {
          uid: "1",
          x: 0,
          y: 0,
          tiles: [
            [DOWN_RIGHT, LEFT_RIGHT],
            [UP_DOWN, EMPTY]
          ]
        },
        {
          uid: "2",
          x: 0,
          y: 2,
          tiles: [
            [UP_DOWN],
            [UP_RIGHT]
          ]
        }
      ],
      size: {x: 4, y: 4},
    }
  }
];
