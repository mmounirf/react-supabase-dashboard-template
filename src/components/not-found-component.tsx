import type { NotFoundRouteProps } from "@tanstack/react-router";

export function NotFoundComponent(props: NotFoundRouteProps) {
  return <p>this is not found route: {JSON.stringify(props)}</p>;
}
