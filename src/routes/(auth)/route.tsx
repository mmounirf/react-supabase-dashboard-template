import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center bg-muted">
      <Card className="w-4xl overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Outlet />
          <div className="relative hidden bg-muted md:block">
            {/* Branding goes here   */}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
