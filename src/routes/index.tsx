import { createFileRoute } from '@tanstack/react-router';
import {useContext, useEffect} from "react";
import {GameContext} from "../providers/GameProvider.tsx";
import LevelDisplay from "../components/Level/LevelDisplay.tsx";

export const Route = createFileRoute('/')({
  component: Component
});

function Component() {
  const { state } = useContext(GameContext);

  useEffect(() => {
    console.log('Set levels');
  }, [state.levels]);

  return <div>
    <p>Complete the puzzle by moving the pieces to the correct position.</p>
    {state.levels.map((level, i) => (
      <LevelDisplay level={level} key={i}/>
    ))}
    <button className={"btn btn-secondary"} onClick={() => {
      console.log("Clearing data from localStorage");
      localStorage.clear();
      window.location.reload();
    }}>Clear data</button>
  </div>;
}
