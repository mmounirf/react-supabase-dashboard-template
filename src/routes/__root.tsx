import { ColorSchemeScript } from "@mantine/core";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/providers/auth-provider";

interface RouterContext {
  queryClient: QueryClient;
  supabase: SupabaseClient;
  session: Session | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    const {
      data: { session },
    } = await context.supabase.auth.getSession();
    return { session };
  },
});

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <ColorSchemeScript defaultColorScheme="auto" />
    </AuthProvider>
  );
}
