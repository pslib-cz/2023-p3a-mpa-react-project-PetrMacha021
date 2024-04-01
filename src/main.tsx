import ReactDOM from "react-dom/client";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";
import {StrictMode} from "react";

const router = createRouter({
  routeTree,
  basepath: "/2023-p3a-mpa-react-project-PetrMacha021/"
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  );
}
