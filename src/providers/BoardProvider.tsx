import {BoardState} from "../data/types/Provider.ts";
import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {Tile} from "../data/types/Tile.ts";

export interface BoardPiece {
  x: number;
  y: number;
  tiles: Tile[][];
}

const initialState: BoardState = {
  tiles: [],
  pieces: []
};

export type Action =
  | { type: "SET_TILES"; tiles: Tile[][] }
  | { type: "SET_TILE"; tile: Tile, x: number, y: number }
  | { type: "SET_PIECES"; pieces: BoardPiece[] };

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "SET_TILES":
      return {...state, tiles: action.tiles};
    case "SET_TILE":
      // eslint-disable-next-line no-case-declarations
      const tiles = state.tiles.map(row => [...row]);
      tiles[action.y][action.x] = action.tile;
      return {...state, tiles};
    case "SET_PIECES":
      return {...state, pieces: action.pieces};
    default:
      return state;
  }
}

export const BoardContext = createContext<{
  state: BoardState;
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null
});

export const BoardProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={{state, dispatch}}>
      {children}
    </BoardContext.Provider>
  );
};
