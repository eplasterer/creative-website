import React from 'react';
import ScallopedPlayButton from './ScallopedPlayButton';

export default function Hero({ isPlaying, onTogglePlay }) {
  return (
    <section className="relative flex-1 w-full flex flex-col items-center select-none z-10">
      {/* Main Headline - Instrument Serif with exact 2 lines and vertical cadence:
          Top: 56px below header (y: 116 in 572px canvas) */}
      <div className="w-full text-center px-4 mt-[56px]">
        <h1 className="font-headline text-[54px] leading-[1.12] tracking-[-0.015em] font-normal text-[#000000]">
          <span className="block">The songs that raised you</span>
          <span className="block">are still in the racks</span>
        </h1>
      </div>

      {/* Scalloped Play Badge - exactly positioned in lower center:
          y: 372 in 572px canvas, 141px below headline */}
      <div className="mt-[141px] mb-[101px] flex flex-col items-center justify-center">
        <ScallopedPlayButton isPlaying={isPlaying} onClick={onTogglePlay} />
      </div>
    </section>
  );
}
