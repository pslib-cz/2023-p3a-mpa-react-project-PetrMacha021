import {
  DOWN_LEFT,
  DOWN_RIGHT,
  EMPTY,
  LEFT_RIGHT,
  START_DOWN,
  START_LEFT,
  START_RIGHT,
  START_UP,
  UP_DOWN, UP_LEFT,
  UP_RIGHT
} from "./types/Tile.ts";
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
  },
  {
    id: 2,
    name: "Level 2",
    completed: false,
    board: {
      pieces: [
        {
          uid: "1",
          x: 3,
          y: 1,
          locked: true,
          tiles: [
            [EMPTY],
            [EMPTY],
            [EMPTY],
          ]
        },
        {
          uid: "2",
          x: 0,
          y: 0,
          locked: true,
          tiles: [
            [START_DOWN, START_DOWN],
          ]
        },
        {
          uid: "3",
          x: 2,
          y: 1,
          locked: true,
          tiles: [
            [START_UP]
          ]
        },
        {
          uid: "4",
          x: 0,
          y: 4,
          locked: true,
          tiles: [
            [START_RIGHT]
          ]
        },
        {
          uid: "5",
          x: 0,
          y: 1,
          locked: false,
          tiles: [
            [UP_DOWN],
            [UP_DOWN],
            [UP_RIGHT]
          ]
        },
        {
          uid: "6",
          x: 1,
          y: 3,
          locked: false,
          tiles: [
            [LEFT_RIGHT, UP_LEFT]
          ]
        },
        {
          uid: "7",
          x: 1,
          y: 1,
          locked: false,
          tiles: [
            [UP_DOWN]
          ]
        },
        {
          uid: "8",
          x: 1,
          y: 2,
          locked: false,
          tiles: [
            [UP_RIGHT, DOWN_LEFT]
          ]
        },
        {
          uid: "9",
          x: 2,
          y: 0,
          locked: false,
          tiles: [
            [DOWN_RIGHT, LEFT_RIGHT, DOWN_LEFT]
          ]
        },
        {
          uid: "10",
          x: 4,
          y: 1,
          locked: false,
          tiles: [
            [UP_DOWN],
            [UP_DOWN],
            [UP_DOWN],
            [UP_LEFT]
          ]
        },
        {
          uid: "11",
          x: 1,
          y: 4,
          locked: false,
          tiles: [
            [LEFT_RIGHT, LEFT_RIGHT, LEFT_RIGHT]
          ]
        }
      ],
      size: {x: 5, y: 5},
    }
  }
];
