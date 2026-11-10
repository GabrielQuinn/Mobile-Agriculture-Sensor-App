# Scientific Dependencies and Open Requirements

The software must not fill these gaps with guessed constants, equations, or classifications.

## Technical sensor analysis

- Confirm the wavelength or wavelength-selection method used for interpretation.
- Confirm how the relevant visible-band signal is selected; it is not necessarily the global maximum.
- Supply the reference or baseline dataset format and versioning process.
- Supply the equation, parameters, units, and rounding rules.
- Supply classification thresholds, labels, and expected results for validation files.
- Confirm how `OVRFLW` affects scientific analysis beyond being a valid non-numeric marker.
- Confirm whether repeated or non-increasing wavelength rows can occur in valid exports.

## Paper-strip analysis

- Supply representative validation images and expected RGB values.
- Confirm the region-of-interest geometry and whether users select it manually.
- Confirm lighting, white-balance, colour-card, and device-calibration requirements.
- Supply the RGB or colour-space interpretation method and classification reference.
- Confirm acceptable image types, dimensions, and file-size limits.

## Product decisions

- Confirm whether the deployed application must load fully offline after first use.
- Confirm the final application name and branding direction.
- Confirm who maintains and approves reference-data updates.
- Confirm how long browser-local history should be retained beyond the seven-day view.
- Confirm comparison behavior for technical and paper-strip measurements.

## Available source material

The team OneDrive contains:

- `Requirements_Specification_Final_Reviewed.docx`, dated 2026-10-19.
- `Client Data/Sample 1 Data_Shared.csv`, with trailing blank columns.
- `Client Data/Sample 2 Data_Shared.csv`, with `OVRFLW` values at the beginning of the spectrum.

The samples represent absent and present examples, but the application must not assign those labels or infer a rule until the lab confirms which is which and how the distinction is calculated.
