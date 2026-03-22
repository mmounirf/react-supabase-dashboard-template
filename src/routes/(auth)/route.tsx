import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center bg-muted">
      <Outlet />
    </main>
  );
}
