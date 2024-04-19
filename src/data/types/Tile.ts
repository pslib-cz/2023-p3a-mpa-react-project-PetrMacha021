import {Connection} from "./Connection.ts";

export interface Tile {
  id: number;
  connection: Connection;
}

export const EMPTY: Tile = {
  id: 0,
  connection: {
    top: false,
    right: false,
    bottom: false,
    left: false
  }
};

export const UP_DOWN: Tile = {
  id: 1,
  connection: {
    top: true,
    right: false,
    bottom: true,
    left: false
  }
};

export const LEFT_RIGHT: Tile = {
  id: 2,
  connection: {
    top: false,
    right: true,
    bottom: false,
    left: true
  }
};

export const UP_RIGHT: Tile = {
  id: 3,
  connection: {
    top: true,
    right: true,
    bottom: false,
    left: false
  }
};

export const UP_LEFT: Tile = {
  id: 4,
  connection: {
    top: true,
    right: false,
    bottom: false,
    left: true
  }
};

export const DOWN_RIGHT: Tile = {
  id: 5,
  connection: {
    top: false,
    right: true,
    bottom: true,
    left: false
  }
};

export const DOWN_LEFT: Tile = {
  id: 6,
  connection: {
    top: false,
    right: false,
    bottom: true,
    left: true
  }
};

export const START_UP: Tile = {
  id: 7,
  connection: {
    top: true,
    right: false,
    bottom: false,
    left: false,
    start: true
  }
};

export const START_RIGHT: Tile = {
  id: 8,
  connection: {
    top: false,
    right: true,
    bottom: false,
    left: false,
    start: true
  }
};

export const START_DOWN: Tile = {
  id: 9,
  connection: {
    top: false,
    right: false,
    bottom: true,
    left: false,
    start: true
  }
};

export const START_LEFT: Tile = {
  id: 10,
  connection: {
    top: false,
    right: false,
    bottom: false,
    left: true,
    start: true
  }
};
