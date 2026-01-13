# Login Screen PRD

## Overview
Implement a login screen with Supabase authentication, redirect management, and responsive UI using Mantine components.

## Requirements

### 1. Route Configuration
- Route path: `/login`
- Route organization: Use `(auth)` route group for pathless organization of auth-related routes
- Protected routes: Redirect unauthenticated users attempting to access authenticated routes (e.g., `/dashboard`) to `/login?redirectTo=[original-path]`
- Redirect parameter: `redirectTo` query param stores the intended destination

### 2. Authentication Flow
- Login method: Supabase `signInWithPassword` with email and password
- Post-login redirect: Redirect users to the path specified in `redirectTo` query param
- Default redirect: If no `redirectTo` param, redirect to `/dashboard`

### 3. Form Validation
- Email field: Required, email format validation
- Password field:
  - Required
  - Minimum 6 characters (Supabase requirement)
  - Recommended 8+ characters (best practice)

### 4. User Interface
- Layout: Centered card on solid color background
- Responsiveness: Fully responsive design for mobile, tablet, and desktop
- Loading state: Button loading indicator (no skeletons - no dynamic data to fetch)
- Error display: Show raw Supabase error messages immediately adjacent to the submit button
- Additional links: "Forgot Password" link only (no signup link)

### 5. Protected Route Behavior
- When unauthenticated user visits authenticated route:
  - Store current path in `redirectTo` query parameter
  - Redirect to `/login?redirectTo=[current-path]`
  - Example: User visits `/dashboard` → redirect to `/login?redirectTo=/dashboard`

### 6. Login Route Behavior
- When already authenticated user visits `/login`:
  - Automatically redirect to `/dashboard` (or `redirectTo` param if present)

## Technical Specifications

### Dependencies
- `@mantine/form` for form state management
- `@mantine/core` components: Container, Card, Paper, TextInput, PasswordInput, Button, Text, Title
- `zod` for schema validation (avoids locale bundle bloat)
- `mantine-form-zod-resolver` for official Mantine zod integration
- `@supabase/supabase-js` `signInWithPassword` method
- `@tanstack/react-router` for route configuration and navigation
- Existing `useAuth()` hook from `AuthProvider` for session management

### File Structure
```
src/routes/(auth)/login/route.tsx
```

**Note:** Using `(auth)` route group for organizing auth-related routes. The parentheses create a pathless group that doesn't affect URL structure.

### Form Fields
- Email: `TextInput` with type="email", label="Email"
- Password: `PasswordInput` with label="Password"
- Submit: `Button` with loading state
- Validation: Zod schema with `zodResolver` integration
  - Email: `z.email("Invalid email")`
  - Password: `z.string().nonempty("Password is required")`

### Error Handling
- Capture errors from `supabase.auth.signInWithPassword()`
- Display raw error message from Supabase below submit button
- Maintain error state for re-submission

### Success Handling
- On successful authentication:
  - Navigate to `redirectTo` param or `/dashboard`
  - AuthProvider will update session state automatically

## Design Decisions

### Background
- Solid color background (specific color to be determined from Mantine theme)

### Card Styling
- Centered card with appropriate padding
- Shadow or border for visual separation
- Responsive width with max-width constraint

### Button Behavior
- Loading state: Disable button and show loading spinner during authentication
- Success: Redirect on successful auth
- Failure: Re-enable button and show error message

### Password Strength
- Minimum 6 characters enforced via validation
- Visual strength indicator is OPTIONAL (not required)

## Questions Resolved
- **Dashboard authentication**: Yes, unauthenticated users redirected to `/login?redirectTo=[path]`
- **Post-login redirect**: Use `redirectTo` query param, default to `/dashboard`
- **Additional links**: "Forgot Password" only, no signup link
- **Form validation**: Email format, password min 6 chars
- **Validation approach**: Use zod schema with mantine-form-zod-resolver (official integration)
- **UI layout**: Centered card on solid color background
- **Loading states**: Button loading indicator only (no skeletons)
- **Error messaging**: Raw Supabase error messages for debugging
- **Route organization**: Use `(auth)` route group for pathless organization without affecting URLs

## Open Questions
None

## Implementation Status
- ✅ Implementation completed
