import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookies, setCookie } from "@tanstack/react-start/server";
import type { Database } from "@/database.types";

//
declare global {
  var __supabaseClient:
    | ReturnType<typeof createBrowserClient<Database>>
    | undefined;
}

export const supabase = createIsomorphicFn()
  .server(() =>
    createServerClient<Database>(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
      {
        cookies: {
          getAll() {
            return Object.entries(getCookies()).map(([name, value]) => ({
              name,
              value,
            }));
          },
          setAll(cookies) {
            cookies.forEach((cookie) => {
              setCookie(cookie.name, cookie.value, { httpOnly: true });
            });
          },
        },
      },
    ),
  )
  .client(() => {
    if (!globalThis.__supabaseClient) {
      globalThis.__supabaseClient = createBrowserClient<Database>(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
      );
    }
    return globalThis.__supabaseClient;
  });
