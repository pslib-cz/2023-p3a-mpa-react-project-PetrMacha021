import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {BoardProvider} from "../providers/BoardProvider.tsx";
import {GameProvider} from "../providers/GameProvider.tsx";
import Styles from "./__root.module.css";

export const Route = createRootRoute({
  component: () => {
    return <main className={Styles.main}>
      <GameProvider>
        <h1>Circuits</h1>
        <BoardProvider>
          <Outlet/>
        </BoardProvider>
      </GameProvider>
      <TanStackRouterDevtools/>
    </main>;
  }
});
