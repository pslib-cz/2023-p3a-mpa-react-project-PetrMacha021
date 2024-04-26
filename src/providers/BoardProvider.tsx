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
  pieces: [],
  hoveredPiece: null
};

export type Action =
  | { type: "SET_TILES"; tiles: Tile[][] }
  | { type: "SET_TILE"; tile: Tile, x: number, y: number }
  | { type: "ADD_PIECE"; piece: BoardPiece }
  | { type: "REMOVE_PIECE", x: number, y: number }
  | { type: "MOVE_PIECE", x: number, y: number, newX: number, newY: number }
  | { type: "HOVER_PIECE", piece: BoardPiece | null };

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "SET_TILES":
      return {...state, tiles: action.tiles};
    case "SET_TILE":
      // eslint-disable-next-line no-case-declarations
      const tiles = state.tiles;
      tiles[action.y][action.x] = action.tile;
      return {...state, tiles: tiles};
    case "ADD_PIECE":
      return {...state, pieces: [...state.pieces, action.piece]};
    case "REMOVE_PIECE":
      return {...state, pieces: state.pieces.filter(piece => piece.x !== action.x || piece.y !== action.y)};
    case "MOVE_PIECE":
      return {...state,
        pieces: state.pieces.map(piece => piece.x === state.hoveredPiece?.x && piece.y === state.hoveredPiece.y ? {
          ...piece,
          x: action.newX,
          y: action.newY
        } : piece)
      };
    case "HOVER_PIECE":
      return {...state, hoveredPiece: action.piece};
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
