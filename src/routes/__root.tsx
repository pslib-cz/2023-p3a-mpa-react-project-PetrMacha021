import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => {
    return <div>
      <h1>Root</h1>
      <Outlet />
      <TanStackRouterDevtools />
    </div>;
  }
});
