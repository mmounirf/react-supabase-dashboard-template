import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center bg-muted">
      <Card className="container max-w-4/5 w-4xl overflow-hidden p-0">
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
