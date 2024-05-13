import {GameState} from "../data/types/Provider.ts";
import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import {Levels} from "../data/Levels.ts";
import Debug from "../Debug.ts";

const initialState: GameState = {
  levels: []
};

export type Action =
  | { type: "SET_LEVELS"; levels: GameState["levels"] }
  | { type: "COMPLETE_LEVEL", level: number }
  | { type: "LOAD_STATE", state: GameState };

function reducer (state: GameState, action: Action): GameState {
  let newState = {};
  switch (action.type) {
    case "SET_LEVELS":
      Debug("Setting levels");
      newState = { ...state, levels: action.levels };
      break;
    case "COMPLETE_LEVEL":
      Debug(`Completing level ${action.level.toString()}`);
      newState = {
        ...state,
        levels: state.levels.map((level) => {
          if (level.id === action.level) {
            return { ...level, completed: true };
          } else {
            return level;
          }
        })
      };
      break;
    case "LOAD_STATE":
      Debug("Loading state", action.state);
      newState = action.state;
      break;
    default:
      newState = state;
      break;
  }

  localStorage.setItem("state", JSON.stringify((newState as GameState)));

  return newState as GameState;
}

export const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null
});

export const GameProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadedState = localStorage.getItem("state");
    if (loadedState) {
      dispatch({type: "LOAD_STATE", state: JSON.parse(loadedState) as GameState});
    } else {
      Debug("No existing state found, initializing with default state.");
      dispatch({type: "LOAD_STATE", state: {
        levels: Levels
      } as GameState});
    }

  }, []);

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  );
};
