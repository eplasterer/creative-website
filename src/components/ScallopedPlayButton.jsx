import React, { useMemo } from 'react';

export default function ScallopedPlayButton({ isPlaying, onClick }) {
  // Generate mathematically smooth 11-lobed curve
  const pathData = useMemo(() => {
    const N = 11; // Exactly 11 lobes as measured from reference
    const cx = 52;
    const cy = 50;
    const R_mean = 44.5;
    const Amp = 6.6;
    const points = [];
    const steps = 300;

    for (let i = 0; i <= steps; i++) {
      const theta = -Math.PI / 2 + (i / steps) * 2 * Math.PI;
      const wave = Math.cos(N * (theta + Math.PI / 2));
      const r = R_mean + Amp * wave;
      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    points.push('Z');
    return points.join('  ');
  }, []);

  return (
    <button
      onClick={onClick}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      className="group relative cursor-pointer outline-none transition-transform duration-200 active:scale-95 focus-visible:ring-1 focus-visible:ring-black"
    >
      <div className="relative flex items-center justify-center">
        <svg
          width="84"
          height="81"
          viewBox="0 0 104 100"
          className={`w-[84px] h-[81px] overflow-visible transition-transform duration-300 group-hover:scale-[1.03] ${
            isPlaying ? 'animate-[spin_30s_linear_infinite]' : ''
          }`}
        >
          {/* Wavy scalloped badge border */}
          <path
            d={pathData}
            fill="#FFFFFF"
            stroke="#1E3B24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Centered play triangle or pause bars */}
          {!isPlaying ? (
            <polygon points="44.5,37.5 44.5,62.5 66.5,50" fill="#000000" />
          ) : (
            <g fill="#000000">
              <rect x="44.5" y="38" width="4.5" height="24" />
              <rect x="55.5" y="38" width="4.5" height="24" />
            </g>
          )}
        </svg>
      </div>
    </button>
  );
}
