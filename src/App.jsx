import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { ambientPlayer } from './utils/audio';

// The layout is composed against a fixed 1024x576 canvas (every offset in
// Navbar/Hero is an exact px value from the design), so rather than reflow
// it we scale the whole stage.
const STAGE_W = 1024;
const STAGE_H = 576;

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scale, setScale] = useState(1);

  const handleTogglePlay = () => {
    const next = ambientPlayer.toggle();
    setIsPlaying(next);
  };

  useEffect(() => {
    return () => {
      ambientPlayer.stop();
    };
  }, []);

  // The video fills the viewport on its own (below), so the content stage
  // uses a "contain" fit: min() keeps the whole composition on screen at the
  // proportions it was designed at. Scaling the content to "cover" instead
  // would both clip the navbar off the top edge and blow the design up
  // larger than intended.
  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white font-sans">
      {/* Background video fills the viewport independently of the content
          stage, so it reaches every edge (no bars) while only cropping by
          the difference between the window and the clip's 16:9 frame. */}
      <video
        ref={(el) => {
          if (el) {
            el.muted = true;
            el.play().catch(() => {});
          }
        }}
        poster={`${import.meta.env.BASE_URL}video-poster.jpg`}
        src={`${import.meta.env.BASE_URL}background-video.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Content stage, scaled to fit and centred over the video */}
      {/* Top-aligned, not centred: when the window is proportionally taller
          than 16:9 the scale is width-limited, so the scaled stage is shorter
          than the viewport. Centring it let that slack fall above the navbar
          and pushed it away from the top edge. */}
      <div className="absolute inset-0 flex items-start justify-center z-10">
        <div
          className="relative flex flex-col justify-between"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            flexShrink: 0,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <Navbar onHitPlay={handleTogglePlay} isPlaying={isPlaying} />
          <Hero isPlaying={isPlaying} onTogglePlay={handleTogglePlay} />
        </div>
      </div>
    </div>
  );
}
