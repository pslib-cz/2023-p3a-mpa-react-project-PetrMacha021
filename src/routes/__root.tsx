import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {BoardProvider} from "../providers/BoardProvider.tsx";
import {GameProvider} from "../providers/GameProvider.tsx";

export const Route = createRootRoute({
  component: () => {
    return <div>
      <GameProvider>
        <h1>Root</h1>
        <BoardProvider>
          <Outlet/>
        </BoardProvider>
      </GameProvider>
      <TanStackRouterDevtools/>
    </div>;
  }
});
