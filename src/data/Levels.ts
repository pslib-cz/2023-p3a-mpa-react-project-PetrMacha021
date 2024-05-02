import {DOWN_RIGHT, EMPTY, LEFT_RIGHT, START_LEFT, UP_DOWN, UP_RIGHT} from "./types/Tile.ts";
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
            [DOWN_RIGHT],
            [UP_DOWN],
            [UP_DOWN],
            [UP_RIGHT]
          ],
          locked: false
        },
        {
          uid: "2",
          x: 1,
          y: 2,
          tiles: [
            [EMPTY, EMPTY],
            [LEFT_RIGHT, LEFT_RIGHT]
          ],
          locked: false
        },
        {
          uid: "3",
          x: 1,
          y: 0,
          tiles: [
            [LEFT_RIGHT, LEFT_RIGHT],
            [EMPTY, EMPTY]
          ],
          locked: false
        },
        {
          uid: "4",
          x: 3,
          y: 0,
          tiles: [
            [START_LEFT],
            [EMPTY],
            [EMPTY],
            [START_LEFT]
          ],
          locked: true
        },
      ],
      size: {x: 4, y: 4},
    }
  }
];
