# Agent Guidelines for React + Supabase Dashboard Template

This is a minimal, well-architected dashboard template built with React 19, TypeScript, TanStack Router/Query, Mantine UI, Tailwind CSS, and Supabase (PostgreSQL, Auth, Edge Functions). The template provides authentication, routing, and UI foundation for building dashboard applications.

## Essential Commands

**Development:**
- `npm run dev` - Start Vite development server with HMR
- `npm run build` - TypeScript type check + Vite production build
- `npm run build:analyze` - Build with bundle size analysis (opens visual report)
- `npm run preview` - Preview production build locally

**Code Quality:**
- `npm run fix` - Run Biome to lint and auto-fix code style issues
- `npm run ci` - Run Biome in CI mode (no auto-fix, fails on errors)

**Supabase:**
- `npm run supabase:gen` - Generate TypeScript types from Supabase database schema

**Testing:**
- No test framework currently configured - add when implementing tests

## Code Style Guidelines

**Formatting (Biome):**
- 2 space indentation, 100 character line width
- Semicolons required, double quotes for JSX attributes
- Trailing commas: es5 format
- Arrow functions always use parentheses: `(x) => x`
- Imports auto-organized via `organizeImports: "on"`
- Classes sorted via `useSortedClasses` rule (warns on unsorted classList, clsx, cva, cn)

**Import Organization:**
- Use `@/` path alias for all src imports (configured in tsconfig.app.json)
  - Example: `import { Button } from "@mantine/core"` and `import { supabase } from "@/lib/supabase"`
- Generated files are ignored by linter/formatter:
  - `src/routeTree.gen.ts` - TanStack Router auto-generated
  - `src/database.gen.ts` - Supabase auto-generated types
- Biome automatically sorts imports alphabetically

**TypeScript Configuration:**
- Strict mode enabled with no unused locals/parameters
- Define Route context types in `src/types/tanstack-router.d.ts`
- Supabase database types auto-generated in `src/database.gen.ts` (run `npm run supabase:gen` after schema changes)
- Mantine theme types extended in `src/types/mantine.d.ts` for custom colors like "brand"

**React Patterns:**
- React Compiler enabled via babel-plugin-react-compiler (no manual useMemo/useCallback needed)
- Components: Functional with named exports
- Use `createFileRoute` from `@tanstack/react-router` for route definitions
- Authentication: Use `useAuth()` hook from `AuthProvider` for session state
- Router context includes: `queryClient`, `supabase`, `session`
- Always export `Route` constant from route files

**Routing (TanStack Router):**
- File-based routing in `src/routes/` (e.g., `/dashboard/route.tsx` creates `/dashboard` route)
- `src/routes/__root.tsx` defines router context and wraps app in AuthProvider
- Use `beforeLoad` for route-level auth checks and data loading
- Default route components configured: `ErrorComponent`, `NotFoundComponent`, `LoadingOverlay`
- Router auto-generates `routeTree.gen.ts` when route files change
- Access router context in routes: `context.queryClient`, `context.supabase`

**Data Fetching (TanStack Query):**
- QueryClient initialized in `src/router.ts` with defaultPreload: "intent"
- Access queryClient via router context in route loaders and components
- Use context.supabase for Supabase client with typed Database from database.gen.ts

**Mantine Components & Styling:**
- Import components from `@mantine/core` and subpackages (@mantine/form, @mantine/hooks, @mantine/notifications, etc.)
- Reference https://mantine.dev/llms.txt for 100+ components and hooks with full documentation
- Use AppShell for responsive application layout (header, navbar, sidebar, footer)
- Use @mantine/form with useForm hook for form state management
- Use Table component for displaying tabular data
- Use Stack (vertical), Flex (horizontal), Grid, Group, and Container for layout composition
- Use Modal, Dialog, Drawer for overlay dialogs; Popover, Menu for dropdowns
- Use Notifications system (@mantine/notifications) for user feedback
- Use hooks from @mantine/hooks (useDisclosure, useLocalStorage, useMediaQuery, etc.)
- Combine Mantine components with Tailwind utility classes when needed
- Classes are automatically sorted by Biome's useSortedClasses rule
- Theme configured in `src/theme.ts` with custom colors (primaryColor: "brand")

**Styling:**
- Import global styles in `src/main.tsx`: `./styles/styles.css` includes Tailwind and Mantine
- Mantine provides design tokens; Tailwind for utility-first additions
- Use Mantine's style prop or sx prop for component-specific styles
- Use Tailwind for layout utilities (flex, grid, spacing, responsive)

## Project Structure

- `src/routes/` - File-based routing (create/delete routes as needed when forking)
- `src/components/` - Reusable UI components (ErrorComponent, NotFoundComponent, ThemeToggle)
- `src/lib/` - Utilities and singletons (supabase client configuration)
- `src/providers/` - React context providers (AuthProvider for session management)
- `src/types/` - TypeScript type declarations (TanStack Router, Mantine extensions)
- `src/theme.ts` - Mantine theme configuration (colors, primaryColor, radius)
- `src/router.ts` - TanStack Router and QueryClient initialization
- `src/database.gen.ts` - Auto-generated Supabase database types
- `src/routeTree.gen.ts` - Auto-generated TanStack Router route tree

## Important Reminders

- Never commit `.env` files (use `.env.local` for local overrides, add secrets to Supabase dashboard)
- Regenerate `src/database.gen.ts` with `npm run supabase:gen` after database schema changes
- Route tree `routeTree.gen.ts` auto-regenerates when route files are added/modified
- Bundle size analysis: Run `analyze=true npm run build` to identify large dependencies
- Template forking: Delete `routes/dashboard/` and `routes/index.tsx` when starting a new project
- Keep `AuthProvider`, router configuration, and Supabase client intact for auth foundation
- Run `npm run fix` before committing to ensure code style compliance
