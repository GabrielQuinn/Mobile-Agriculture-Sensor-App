// Shared data shape for one spectrum reading.
// This is the "contract" the visualization expects from the processing step.
// Agree on it with Gabe before the final version.

export interface SpectrumReading {
  id: string;                 // e.g. "sample1"
  label: string;              // shown to the user, e.g. "Sample 1"
  wavelengths: number[];      // nm, e.g. 230, 240, ... 900
  absorbance: (number | null)[]; // same length; null = instrument OVRFLW (no valid reading)
  peak?: { wavelength: number; absorbance: number }; // supplied by processing once the lab defines it
}
