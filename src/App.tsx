import { useState } from 'react';
import SpectrumChart from './Visualization/spectrumChart';
import { sampleReadings } from './Visualization/sampleData';

type View = 'sample1' | 'sample2' | 'both';

export default function App() {
  const [view, setView] = useState<View>('sample1');
  const readings = view === 'both' ? sampleReadings : sampleReadings.filter((r) => r.id === view);

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 16,
        fontFamily: 'Segoe UI, system-ui, sans-serif',
      }}
    >
      <h1>Spectrum sandbox</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['sample1', 'sample2', 'both'] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            aria-pressed={view === v}
            style={{ padding: '10px 16px', cursor: 'pointer', fontWeight: view === v ? 700 : 400 }}
          >
            {v === 'both' ? 'Compare both' : v === 'sample1' ? 'Sample 1' : 'Sample 2'}
          </button>
        ))}
      </div>
      <SpectrumChart readings={readings} />
    </main>
  );
}
