import {Level} from "../../data/types/Level.ts";
import {Link} from "@tanstack/react-router";
import Styles from "./LevelDisplay.module.css";

export default function LevelDisplay({level}: { level: Level }) {
  return <Link
    to={"/level/$id"}
    params={{id: level.id.toString()}}
    className={Styles.container}
  >
    <span>{level.name}</span>
    <span>{level.completed ? "Completed" : "Not Completed"}</span>
  </Link>;
}
