import React from 'react';

const navLinks = [
  { label: 'Dig', href: '#dig' },
  { label: 'Shelves', href: '#shelves' },
  { label: 'Labels', href: '#labels' },
  { label: 'Membership', href: '#membership' },
];

export default function Navbar({ onHitPlay, isPlaying }) {
  return (
    <header className="w-full flex items-center justify-between pt-[34px] px-[7.8%] select-none z-10">
      {/* Left: record mark + gothic wordmark */}
      <div className="flex items-center">
        <a
          href="#"
          className="flex items-center gap-[7px] select-none hover:opacity-75 transition-opacity"
          aria-label="Deadwax Home"
        >
          {/* Concentric grooves closing on the blank runout at the centre */}
          <svg
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px] shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Deadwax"
          >
            <circle cx="12" cy="12" r="11" fill="none" stroke="#000000" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="6.2" fill="none" stroke="#000000" strokeWidth="1.1" />
            <circle cx="12" cy="12" r="1.7" fill="#000000" />
          </svg>
          <span className="font-gothic text-[21px] leading-none text-black tracking-normal">
            Deadwax
          </span>
        </a>
      </div>

      {/* Center: Navigation Links */}
      <nav className="flex items-center gap-[30px] font-sans text-[10px] font-medium uppercase tracking-[0.13em] text-[#1A1A1A]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[#1A1A1A]/75 hover:text-black transition-colors duration-200 py-1"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: Ambient sound toggle */}
      <div className="flex items-center">
        <button
          onClick={onHitPlay}
          className={`bg-black text-white font-sans text-[11px] font-semibold uppercase tracking-[0.11em] w-[96px] h-[34px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer select-none ${
            isPlaying ? 'bg-neutral-800' : 'hover:bg-neutral-800'
          }`}
        >
          {isPlaying ? 'Lift It' : 'Spin It'}
        </button>
      </div>
    </header>
  );
}
