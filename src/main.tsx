import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./lib/supabase.ts";
import { queryClient, router } from "./router.ts";
import "./styles/styles.css";
import { theme } from "./theme.ts";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "@react-supabase-dashboard-template/theme",
});

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider colorSchemeManager={colorSchemeManager} theme={theme}>
          <RouterProvider context={{ queryClient, supabase }} router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
