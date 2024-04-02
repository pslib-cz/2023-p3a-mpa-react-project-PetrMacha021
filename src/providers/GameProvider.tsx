import {GameState} from "../data/types/Provider.ts";
import {createContext, Dispatch, ReactNode, useReducer} from "react";

const initialState: GameState = {
  levels: []
};

export type Action =
  | { type: "SET_LEVELS"; levels: GameState["levels"] };

export const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "SET_LEVELS":
      return { ...state, levels: action.levels };
    default:
      return state;
  }
};

export const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null
});

export const GameProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  );
};
