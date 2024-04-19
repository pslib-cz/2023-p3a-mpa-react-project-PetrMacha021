import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {BoardProvider} from "../providers/BoardProvider.tsx";

export const Route = createRootRoute({
  component: () => {
    return <div>
      <h1>Root</h1>
      <BoardProvider>
        <Outlet/>
      </BoardProvider>
      <TanStackRouterDevtools/>
    </div>;
  }
});
