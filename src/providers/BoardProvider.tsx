import {BoardState} from "../data/types/Provider.ts";
import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {Tile} from "../data/types/Tile.ts";
import {BoardPiece} from "../data/types/Piece.ts";
import {Level} from "../data/types/Level.ts";

const initialState: BoardState = {
  board: {
    pieces: [],
    size: {x: 0, y: 0}
  },
  pieces: [],
  hoveredPiece: null,
};

export type Action =
  | { type: "SET_TILES"; tiles: Tile[][] }
  | { type: "SET_TILE"; tile: Tile, x: number, y: number }
  | { type: "ADD_PIECE"; piece: BoardPiece }
  | { type: "REMOVE_PIECE", x: number, y: number }
  | { type: "LOCK_LEVEL" }
  | { type: "MOVE_PIECE", x: number, y: number, newX: number, newY: number }
  | { type: "HOVER_PIECE", piece: BoardPiece | null }
  | { type: "LOAD_LEVEL", level: Level };

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "SET_TILES":
      console.log("Setting tiles");
      return {...state};
    case "SET_TILE":
      console.log(`Setting tile at x: ${action.x.toString()}, y: ${action.y.toString()}`);
      // const tiles = state.tiles;
      // tiles[action.y][action.x] = action.tile;
      return {...state};
    case "ADD_PIECE":
      console.log(`Adding piece ${action.piece.uid}`);
      // eslint-disable-next-line no-case-declarations
      for (let y = 0; y < action.piece.tiles.length; y++) {
        for (let x = 0; x < action.piece.tiles[y].length; x++) {
          if (y + action.piece.y >= state.board.size.y || x + action.piece.x >= state.board.size.x) {
            console.log(`Piece ${action.piece.uid} out of bounds`);
            console.log(`Tile on x: ${(x + action.piece.x).toString()} y: ${(y + action.piece.y).toString()} is out of bounds`);
            return state;
          }
        }
      }
      if (checkPieceOverlap(state.pieces, action.piece)) {
        console.log(`Piece ${action.piece.uid} overlaps with another piece`);
        return state;
      }
      return {...state, pieces: [...state.pieces, action.piece]};
    case "REMOVE_PIECE":
      console.log(`Removing piece at x: ${action.x.toString()}, y: ${action.y.toString()}`);
      return {...state, pieces: state.pieces.filter(piece => piece.x !== action.x || piece.y !== action.y)};
    case "LOCK_LEVEL":
      console.log("Locking level");
      return {...state, pieces: state.pieces.map(piece => ({...piece, locked: true}))};
    case "MOVE_PIECE":
      console.log(`Moving piece at x: ${action.x.toString()}, y: ${action.y.toString()} to x: ${action.newX.toString()}, y: ${action.newY.toString()}`);
      // eslint-disable-next-line no-case-declarations
      const piece = state.pieces.find(piece => piece.x === state.hoveredPiece?.x && piece.y === state.hoveredPiece.y);
      if (!piece) {
        console.log(`Piece not found at x: ${action.x.toString()}, y: ${action.y.toString()}`);
        return state;
      }
      for (let y = 0; y < piece.tiles.length; y++) {
        for (let x = 0; x < piece.tiles[y].length; x++) {
          if (y + action.newY >= state.board.size.y || x + action.newX >= state.board.size.x) {
            console.log(`Piece ${piece.uid} out of bounds`);
            console.log(`x: ${x.toString()}, y: ${y.toString()}, newX: ${action.newX.toString()}, newY: ${action.newY.toString()}`);
            return state;
          }
        }
      }
      // eslint-disable-next-line no-case-declarations
      const newPiece: BoardPiece = {
        ...piece,
        x: action.newX,
        y: action.newY
      };
      if (checkPieceOverlap(state.pieces.filter(x => x.uid !== piece.uid), newPiece)) {
        console.log(`Piece ${piece.uid} overlaps with another piece`);
        return state;
      }
      return {
        ...state,
        pieces: state.pieces.map(piece => piece.x === state.hoveredPiece?.x && piece.y === state.hoveredPiece.y ? newPiece : piece)
      };
    case "HOVER_PIECE":
      if (!action.piece) return {...state, hoveredPiece: null};
      console.log(`Hovering piece ${action.piece.uid}`);
      return {...state, hoveredPiece: action.piece};
    case "LOAD_LEVEL":
      console.log("Loading level", action.level);
      return {
        board: action.level.board,
        pieces: action.level.completed ? action.level.board.pieces.map(piece => ({
          ...piece,
          locked: true
        })) : action.level.board.pieces.filter(piece => piece.locked),
        hoveredPiece: null,
      };
  }
}

function checkPieceOverlap(pieces: BoardPiece[], newPiece: BoardPiece): boolean {
  const positions: [number, number][] = [];
  for (const piece of pieces) {
    for (let y = 0; y < piece.tiles.length; y++) {
      for (let x = 0; x < piece.tiles[y].length; x++) {
        positions.push([x + piece.x, y + piece.y]);
      }
    }
  }

  console.log("Checking overlap for piece ", newPiece.uid);
  console.log("Positions of other pieces", positions);
  for (let y = 0; y < newPiece.tiles.length; y++) {
    for (let x = 0; x < newPiece.tiles[y].length; x++) {
      console.log(`Checking x: ${(x + newPiece.x).toString()} y: ${(y + newPiece.y).toString()} against positions`, positions.some(([px, py]) => px === newPiece.x + x && py === newPiece.y + y));
      if (positions.some(([px, py]) => px === newPiece.x + x && py === newPiece.y + y)) {
        return true;
      }
    }
  }
  return false;
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
