import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import type { SpectrumReading } from '../types/spectrum';

const COLORS = ['#1f6fb2', '#c4561a', '#2f855a', '#7b3fa0'];

// Wavelength ranges where absorbance is null (instrument went off scale).
function offScaleRanges(r: SpectrumReading): [number, number][] {
  const out: [number, number][] = [];
  let start: number | null = null;
  r.wavelengths.forEach((w, i) => {
    if (r.absorbance[i] === null) {
      if (start === null) start = w;
    } else if (start !== null) {
      out.push([start, r.wavelengths[i - 1]]);
      start = null;
    }
  });
  if (start !== null) out.push([start, r.wavelengths[r.wavelengths.length - 1]]);
  return out;
}

// Largest valid value. Display convenience only: replace with reading.peak from processing.
function highestValid(r: SpectrumReading) {
  let best: { wavelength: number; absorbance: number } | null = null;
  r.wavelengths.forEach((w, i) => {
    const a = r.absorbance[i];
    if (a !== null && (best === null || a > best.absorbance)) best = { wavelength: w, absorbance: a };
  });
  return best;
}

interface Props {
  readings: SpectrumReading[];
  height?: number;
}

export default function SpectrumChart({ readings, height = 460 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || readings.length === 0) return;

    const step = readings[0].wavelengths[1] - readings[0].wavelengths[0];
    const traces: Partial<Plotly.PlotData>[] = [];
    const shapes: Partial<Plotly.Shape>[] = [];
    const annotations: Partial<Plotly.Annotations>[] = [];

    readings.forEach((r, idx) => {
      const color = COLORS[idx % COLORS.length];
      traces.push({
        x: r.wavelengths,
        y: r.absorbance,
        type: 'scatter',
        mode: 'lines+markers',
        name: r.label,
        connectgaps: false, // keeps the gap where data is null
        line: { color, width: 2.5 },
        marker: { size: 5, color },
        hovertemplate: `%{x} nm<br>Absorbance %{y:.3f}<extra>${r.label}</extra>`,
      });

      const p = r.peak ?? highestValid(r);
      if (p) {
        traces.push({
          x: [p.wavelength],
          y: [p.absorbance],
          type: 'scatter',
          mode: 'markers',
          showlegend: false,
          marker: { size: 13, color: '#ffffff', line: { color, width: 3 } },
          hovertemplate: `${r.peak ? 'Peak' : 'Highest valid value'}<br>%{x} nm, %{y:.3f}<extra>${r.label}</extra>`,
        });
      }

      offScaleRanges(r).forEach(([a, b]) => {
        shapes.push({
          type: 'rect', xref: 'x', yref: 'paper',
          x0: a - step / 2, x1: b + step / 2, y0: 0, y1: 1,
          fillcolor: 'rgba(85,102,111,0.13)', line: { width: 0 }, layer: 'below',
        });
        annotations.push({
          x: (a + b) / 2, xref: 'x', y: 0.97, yref: 'paper',
          showarrow: false, yanchor: 'top',
          text: readings.length > 1 ? `Off scale<br>(${r.label})` : 'Off scale',
          font: { size: 12, color: '#55666f' },
        });
      });
    });

    const layout: Partial<Plotly.Layout> = {
      margin: { l: 64, r: 24, t: 16, b: 56 },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      font: { family: 'Segoe UI, system-ui, sans-serif', color: '#14232b', size: 14 },
      xaxis: { title: { text: 'Wavelength (nm)' }, gridcolor: '#e6ecef', zeroline: false },
      yaxis: { title: { text: 'Absorbance' }, gridcolor: '#e6ecef', rangemode: 'tozero' },
      legend: { orientation: 'h', y: -0.2 },
      hovermode: 'closest',
      shapes,
      annotations,
    };

    Plotly.react(el, traces as Plotly.Data[], layout, {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    });

    return () => { Plotly.purge(el); }; // clean up when the component unmounts or data changes
  }, [readings]);

  return <div ref={ref} style={{ width: '100%', height }} role="img" aria-label="Absorbance versus wavelength chart" />;
}
