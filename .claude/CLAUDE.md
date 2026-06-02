# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check then bundle (tsc && vite build)
npm run lint      # ESLint with zero warnings allowed
npm run preview   # Preview production build locally
```

No test suite is configured.

## Architecture

### Provider hierarchy

`App.tsx` nests providers in this exact order — order matters for dependency access:

```
Redux <Provider>
  └── AuthContextProvider   (Firebase auth state)
        └── ProfileContextProvider  (Firestore user/doctor data, depends on AuthContext)
              └── AppRouter  (IntlProvider wraps routes here, reads Redux language state)
```

### State management — two layers

**Redux Toolkit** (`src/store/`) holds only UI state: the active language (`languagesSlice`). Language is initialised from `navigator.language` and persisted in Redux so `IntlProvider` in the Router can reactively switch locales.

**React Context** handles all Firebase data:
- `AuthContext` — wraps Firebase Auth (`createUser`, `signIn`, `logout`, `saveUserDataToFirestore`). Exposes `user` (Firebase `User | null`) and `loading` (auth initialisation guard).
- `ProfileContext` — wraps Firestore reads/writes: `currentUser` (full profile of the logged-in user), `doctorsList` (all approved doctors), and approval workflow (`saveDoctorDataToFirestore`, `processApprovalStatus`).

### Firestore data model

Single `users` collection stores all user types. Role field (`patient` | `doctor` | `admin`) determines capabilities. `TProfile = IDoctorProfile & IUserProfile` — doctor profiles are a superset of patient profiles stored in the same document.

Approval flow: a patient submits a doctor application → document `status` set to `pending` → admin's `notifications` array updated → admin calls `processApprovalStatus` to set `role: 'doctor'` and `status: approved | rejected`.

### Routing & layouts

Two route guards in `src/components/`:
- `ProtectedRoute` — redirects unauthenticated users to `/login`
- `AuthRoutes` — redirects already-authenticated users to `/`

Two layouts:
- `MainLayout` — Header + scrollable content area + Footer, used for all protected pages
- `AuthLayout` — minimal wrapper for login/registration

Routes are defined as constants in `src/routes.ts` and imported everywhere — never hardcode path strings.

### Forms

All forms use **Formik** + **Yup** validation schemas (co-located `validationSchema.ts` next to each page). Reusable field wrappers live in `src/components/`: `FormikInput`, `FormikDropdown`, `FormikTextArea`.

### Internationalisation

Translation keys live in `src/languages/en.json` and `src/languages/uk.json`. Use `react-intl`'s `useIntl()` hook or `<FormattedMessage>` — never render raw Ukrainian/English strings directly. Add new keys to both files simultaneously.

### SVGs

Imported as React components via `vite-plugin-svgr`. Use named imports: `import { ReactComponent as MyIcon } from './icon.svg'`.

## Code style

Prettier config: single quotes, semicolons, 2-space indent, `es5` trailing commas, always wrap arrow-function params.

ESLint enforces `@typescript-eslint/recommended` + `react-hooks/recommended`. Lint must pass with zero warnings (`--max-warnings 0`) before committing.
