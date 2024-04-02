import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/level/$id')({
  component: Component
});

function Component() {
  const { id } = Route.useParams();
  return <div>Level {id}</div>;
}
