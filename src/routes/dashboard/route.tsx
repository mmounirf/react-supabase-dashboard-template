import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
        search: { redirectTo: location.pathname },
      });
    }
  },
});

function RouteComponent() {
  return (
    <main className="min-h-svh w-full">
      <Outlet />
    </main>
  );
}
