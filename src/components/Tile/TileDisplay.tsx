import {Tile} from "../../data/types/Tile.ts";
import config from "../../../config.json";
import Styles from "./TileDisplay.module.css";

export default function TileDisplay({tile}: {tile: Tile}) {
  const baseUrl = config.base;

  return <>
    <img src={`${baseUrl}tiles/${tile.id.toString()}.svg`} alt="tile" className={Styles.image} />
  </>;
}
