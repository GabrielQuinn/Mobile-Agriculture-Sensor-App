# Team Development Workflow

## Role ownership and initial tasks

### Frontend Developer 1

Owns responsive layout, navigation, design tokens, shared components, accessibility patterns, and general styling.

**Recommended first task:** define the application shell and shared design tokens after the team approves initial wireframes.

### Frontend Developer 2

Owns the technical CSV input and paper-strip image/camera input experiences, validation messages, and user guidance.

**Recommended first task:** design the technical upload form against the agreed parser contract without adding parsing logic to the component.

### Frontend Developer 3

Owns result presentation, scientific charts, history screens, and comparison visualization.

**Recommended first task:** turn the existing spectrum prototype into a reusable typed chart component after Backend Developer 1 finalizes the spectrum contract.

### Backend Developer 1

Owns shared models, CSV parsing, scientific calculations, reference configuration, image-analysis algorithms, and technical integration. These modules run in the browser.

**Recommended first task:** define the spectrum parsing contract and add test-first support for the supplied file structures.

### Backend Developer 2

Owns IndexedDB, history management, import/export, persistence, and supporting integration tests.

**Recommended first task:** propose the version 1 measurement schema and repository API for team review before creating the database.

## Branches

Use one short-lived branch per focused change:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `test/<short-description>`

Do not commit directly to shared `main`. Keep branches short-lived and update them from `main` before final review when necessary.

## Pull requests

Each pull request should include:

- The requirement, issue, or task it addresses.
- A concise description of the change and important design decisions.
- Screenshots for visible UI changes.
- Test cases added and commands run.
- Known limitations or scientific assumptions.
- A reviewer from the affected ownership area.

Avoid combining formatting sweeps, dependency upgrades, and feature work in one pull request. Never merge code that presents an unvalidated scientific classification as a real result.

## Test-first development

For behavior changes, write a test that describes the public contract and observe it fail before adding the implementation. Prefer real parsers, services, and an in-memory IndexedDB implementation over tests that only assert mocks were called.

Minimum local checks before review:

```bash
npm run check
npm run build
```

## Definition of done

- The agreed behavior works at representative phone, tablet, and desktop widths when UI is involved.
- New behavior has tests, including malformed or failure cases.
- Type-checking, linting, formatting, tests, and production build pass.
- User-facing errors distinguish invalid input from missing reference data.
- Documentation is updated when setup, contracts, or scientific assumptions change.
