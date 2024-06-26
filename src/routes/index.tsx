import {createFileRoute} from '@tanstack/react-router';
import {useContext, useEffect} from "react";
import {GameContext} from "../providers/GameProvider.tsx";
import LevelDisplay from "../components/Level/LevelDisplay.tsx";
import Styles from "./index.module.css";
import Debug from "../Debug.ts";

export const Route = createFileRoute('/')({
  component: Component
});

function Component() {
  const {state} = useContext(GameContext);

  useEffect(() => {
    Debug('Set levels');
  }, [state.levels]);

  return <div>
    <p>Complete the puzzle by moving the pieces to the correct position.</p>
    <div className={Styles.levels}>
      {state.levels.map((level, i) => (
        <LevelDisplay level={level} key={i}/>
      ))}
    </div>
    <button className={"btn btn-secondary"} onClick={() => {
      Debug("Clearing data from localStorage");
      localStorage.clear();
      window.location.reload();
    }}>Clear data
    </button>
  </div>;
}
