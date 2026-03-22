import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import type { GoTrueClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: Awaited<ReturnType<GoTrueClient["getClaims"]>>;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "React Supabase Dashboard Template",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
});

function RootLayout() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    let deadLock: NodeJS.Timeout;
    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange((event, session) => {
      clearTimeout(deadLock);

      deadLock = setTimeout(async () => {
        const claims = await supabase().auth.getClaims(session?.access_token);
        router.update({
          context: {
            ...router.options.context,
            session: claims,
          },
        });

        if (["SIGNED_IN", "SIGNED_OUT", "TOKEN_REFRESHED"].includes(event)) {
          router.invalidate();
        }
      }, 0);
    });

    return () => {
      clearTimeout(deadLock);
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </QueryClientProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
