# Excalisys Agricultural Sensor Web Application

**Authors:** Gabriel Quinn, Brianna Boyd, Faizah Qader, Griffin Robinson, Neel Patel

A five-person Trent University software engineering capstone project for a privacy-focused agricultural sensor analysis web application.

## Current status

This repository currently contains the development foundation and the existing spectrum-chart prototype from the `Visualization` branch. Product workflows, scientific interpretation, image analysis, and browser-local history are intentionally not implemented yet.

The intended application will remain privacy focused:

- Scientific processing runs locally in the browser.
- Measurement history will use IndexedDB through Dexie.
- There is no account system, cloud database, or cloud synchronization.
- Uploaded measurement data must not be sent to an application server.
- Scientific thresholds, equations, and classifications must come from the Trent lab and must not be invented by developers.

Read [Scientific open items](docs/SCIENTIFIC_OPEN_ITEMS.md) before implementing processing behavior.

## Technology foundation

- React 19, Vite 8, and TypeScript
- React Router for future application navigation
- Papa Parse for future CSV parsing
- Plotly.js for scientific charts
- Dexie for future IndexedDB persistence
- Browser Canvas API for future image and RGB processing
- Vitest and Testing Library for tests
- ESLint and Prettier for code quality
- GitHub Actions for automated checks

These packages establish the development environment only. Their presence does not mean the related product feature has been implemented.

## Prerequisites

Install the following before working on the project:

- [Node.js](https://nodejs.org/) 20.19 or newer
- npm 10 or newer, included with supported Node.js releases
- Git

The repository includes `.nvmrc`. If you use [nvm](https://github.com/nvm-sh/nvm), run:

```bash
nvm install
nvm use
```

Confirm your versions:

```bash
node --version
npm --version
```

## Install dependencies

From the repository root, install all runtime and development dependencies:

```bash
npm install
```

For a clean, reproducible installation that exactly follows `package-lock.json`, use:

```bash
npm ci
```

Use `npm install` when intentionally adding or updating a dependency. Commit both `package.json` and `package-lock.json` in the same pull request.

No `.env` file or secret is required for the current foundation.

## Run the project

Start the local development server:

```bash
npm run dev
```

Open the URL printed by Vite. The current screen is the existing spectrum prototype.

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Development commands

| Command                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Start the local development server with hot reload.              |
| `npm run build`        | Type-check and create static production files in `dist/`.        |
| `npm run preview`      | Serve the production build locally.                              |
| `npm run typecheck`    | Run TypeScript without emitting files.                           |
| `npm run lint`         | Run ESLint across the repository.                                |
| `npm run format`       | Format supported files with Prettier.                            |
| `npm run format:check` | Check formatting without changing files.                         |
| `npm run test`         | Run Vitest once; succeeds with no tests during foundation setup. |
| `npm run test:watch`   | Run Vitest in watch mode while developing.                       |
| `npm run check`        | Run formatting, linting, type-checking, and tests.               |

If dependency installation behaves unexpectedly, verify the prerequisite versions and run `npm ci` to recreate `node_modules` from the lock file. Do not use `npm audit fix --force` without reviewing the breaking dependency changes it proposes.

## Repository structure

```text
src/
  components/       shared UI and layout components
  pages/            route-level screens
  services/         framework-neutral processing services
  storage/          IndexedDB database and repositories
  models/           shared TypeScript contracts
  test/             test setup, fixtures, and factories
  utils/            small reusable utilities
  Visualization/    existing spectrum-chart prototype
```

Keep scientific processing and storage logic out of React components. UI code should consume typed service functions so developers can work with fewer merge conflicts. See [Architecture](docs/ARCHITECTURE.md) for the intended boundaries.

## Team workflow

Use short-lived branches and pull requests. Recommended branch names:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `test/<short-description>`

Do not commit directly to shared `main`. Keep pull requests focused, link the requirement or task, describe verification performed, and request review from the owner of any area you change. Full ownership and starter-task guidance are in [Team workflow](docs/TEAM_WORKFLOW.md).

## Adding code later

- **Page:** add a route-level component under `src/pages/`, then register it with the router once routing is introduced.
- **Component:** add a focused reusable component under `src/components/`; keep domain calculations in a service.
- **Service:** define or update shared types in `src/models/`, write failing unit tests, then add the framework-neutral implementation under `src/services/`.
- **Storage change:** update the versioned Dexie schema and include migration and repository tests.

Tests should cover public behavior, including malformed inputs and browser-storage errors. Never add provisional scientific constants merely to make a demo produce a classification.

## Static hosting

`npm run build` produces a static `dist/` directory suitable for services such as Cloudflare Pages.

Suggested Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20.19` or newer

`public/_redirects` provides a single-page application fallback for compatible static hosts. The foundation has no server-side processing or deployment secrets.

## Project documentation

- [Architecture and boundaries](docs/ARCHITECTURE.md)
- [Team roles and pull-request workflow](docs/TEAM_WORKFLOW.md)
- [Scientific dependencies and unresolved requirements](docs/SCIENTIFIC_OPEN_ITEMS.md)
