# Architecture and Boundaries

## Current scope

The repository contains tooling, dependency configuration, empty ownership folders, and the existing spectrum-chart prototype. Product workflows and data services should be added incrementally through reviewed pull requests.

## Intended dependency direction

```text
pages and components
        |
        v
shared models and service interfaces
        |
        +----> CSV and scientific services
        +----> image-processing services
        +----> IndexedDB storage services
        +----> visualization components
```

React components may coordinate user interactions, but they should not contain CSV parsing, scientific calculations, pixel calculations, or direct IndexedDB queries. Services must not import React.

## Folder ownership

| Folder               | Responsibility                                                                | Primary owner           |
| -------------------- | ----------------------------------------------------------------------------- | ----------------------- |
| `src/components/`    | Shared UI and layout components                                               | Frontend Developer 1    |
| `src/pages/`         | Route-level screens and workflow composition                                  | Frontend Developers 1-3 |
| `src/Visualization/` | Existing chart prototype; migrate deliberately when visualization work begins | Frontend Developer 3    |
| `src/models/`        | Shared TypeScript contracts used across UI and services                       | Backend Developer 1     |
| `src/services/`      | CSV, scientific, image, and transfer logic                                    | Backend Developers 1-2  |
| `src/storage/`       | Dexie schema, migrations, and history repositories                            | Backend Developer 2     |
| `src/test/`          | Shared test setup, fixtures, and factories                                    | All developers          |
| `src/utils/`         | Small reusable helpers without domain ownership                               | All developers          |

## Planned contracts

- Represent `OVRFLW` explicitly; never convert it to numeric zero.
- Keep source data, descriptive processing values, and interpretation results distinct.
- Version scientific reference data independently from saved measurements.
- Use tagged unions for technical and paper-strip records.
- Keep IndexedDB behind repository functions rather than importing Dexie throughout the UI.
- Treat JSON as the lossless history backup format; CSV is a summary export.

## Dependency policy

Add a package only when the browser platform or current dependencies do not provide a clear solution. Explain the need in the pull request, prefer maintained packages with compatible licences, and update the lock file. Do not introduce a UI framework, state-management library, server framework, cloud SDK, or analytics package without a team architecture decision.

## Privacy boundary

Measurement files, images, derived values, and history must remain on the user's device. A hosting platform serves only static application assets. Any code that performs network requests with measurement data is outside the approved architecture and requires explicit client and team review.
