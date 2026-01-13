import { LoadingOverlay } from "@mantine/core";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { ErrorComponent } from "./components/error-component";
import { NotFoundComponent } from "./components/not-found-component";
import { supabase } from "./lib/supabase";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    session: null,
    supabase,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingComponent: LoadingOverlay,
  defaultErrorComponent: ErrorComponent,
  defaultNotFoundComponent: NotFoundComponent,
});

export { router, queryClient };
