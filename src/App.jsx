import React from 'react';

const capPhoto = import.meta.env.BASE_URL + 'bgn-cap-white.png';
const networkStoryUrl = 'https://blog.google/company-news/inside-google/life-at-google/how-camille-and-aurane-became-community-leads-at-google/';

const benefits = [
  {
    number: '01',
    title: 'Let the message show',
    text: 'Bright white BGN embroidery stands out against the black cap, making your connection easy to see.',
  },
  {
    number: '02',
    title: 'Wear support with meaning',
    text: 'The mark represents a community working to cultivate Black leaders in technology and beyond.',
  },
  {
    number: '03',
    title: 'Keep the look easy',
    text: 'A clean black cap and curved brim bring a simple, everyday finish to your rotation.',
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#151515] antialiased">
      <header id="top" className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 border-b border-black/10 px-5 py-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="BGN cap home">
          <span className="text-[1.75rem] font-black leading-none tracking-[-0.1em]">BGN</span>
          <span className="h-8 w-px bg-black/20" aria-hidden="true" />
          <span className="text-[0.59rem] font-semibold uppercase leading-[1.35] tracking-[0.16em]">Black Googler<br />Network</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#cap" className="transition-opacity hover:opacity-60">The cap</a>
          <a href="#bgn-story" className="transition-opacity hover:opacity-60">About BGN</a>
        </nav>
        <a href="#cap" className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#353535] sm:px-5 sm:text-sm">
          Explore the cap <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:py-16 lg:gap-16 lg:px-12 lg:py-20">
          <div className="relative z-10 max-w-[660px]">
            <p className="mb-6 flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.2em] text-black/60">
              <span className="h-2 w-2 rounded-full bg-[#bfd64a]" aria-hidden="true" />
              A mark with meaning
            </p>
            <h1 id="hero-title" className="text-[3.35rem] font-semibold leading-[0.93] tracking-[-0.075em] sm:text-6xl md:text-7xl lg:text-[5.7rem]">
              Wear what<br />you stand for.
            </h1>
            <p className="mt-7 max-w-[550px] text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
              Meet the BGN cap: a black everyday staple with bright white embroidery. A simple way for Google employees, BGN members, and allies to show their connection to a network supporting Black tech professionals.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#cap" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#bfd64a] px-6 py-3 text-sm font-bold text-[#151515] transition-transform hover:-translate-y-0.5">
                Discover the BGN cap <span aria-hidden="true">↓</span>
              </a>
              <a href="#bgn-story" className="inline-flex min-h-12 items-center px-4 py-3 text-sm font-semibold underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black">
                Learn about BGN
              </a>
            </div>
            <p className="mt-8 max-w-[480px] border-l-2 border-[#bfd64a] pl-4 text-sm leading-6 text-black/60">
              For Google employees and BGN allies in Texas and beyond—from Houston and Amarillo to communities everywhere.
            </p>
          </div>

          <figure id="cap" className="relative mx-auto w-full max-w-[650px] scroll-mt-8">
            <div className="absolute -left-2 top-5 z-10 rounded-full bg-white px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] shadow-sm sm:-left-4 sm:top-8">
              BGN / 01
            </div>
            <div className="overflow-hidden rounded-[1.5rem] bg-[#e9e8e2] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.08)] sm:rounded-[2rem] sm:p-3">
              <img src={capPhoto} alt="Black baseball cap with bright white BGN embroidery and a curved brim" className="aspect-square w-full rounded-[1.15rem] object-cover mix-blend-multiply sm:rounded-[1.55rem]" fetchPriority="high" />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-1 pt-4 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black/55 sm:text-xs">
              <span>The BGN cap</span>
              <span>Black / white embroidered mark</span>
            </figcaption>
          </figure>
        </section>

        <section aria-label="Cap benefits" className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid border-y border-black/15 sm:grid-cols-3">
            <div className="border-b border-black/15 py-5 sm:border-b-0 sm:border-r sm:py-6 sm:pr-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/45">01 / Community</p>
              <p className="mt-2 text-sm font-semibold">A symbol you can stand behind</p>
            </div>
            <div className="border-b border-black/15 py-5 sm:border-b-0 sm:border-r sm:px-5 sm:py-6">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/45">02 / Contrast</p>
              <p className="mt-2 text-sm font-semibold">White BGN embroidery, clearly seen</p>
            </div>
            <div className="py-5 sm:py-6 sm:pl-5">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/45">03 / Everyday</p>
              <p className="mt-2 text-sm font-semibold">An easy black cap for your rotation</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-title" className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="mb-4 text-[0.67rem] font-bold uppercase tracking-[0.2em] text-black/50">Made for community</p>
              <h2 id="benefits-title" className="max-w-[480px] text-4xl font-semibold leading-[1] tracking-[-0.065em] sm:text-5xl">
                More than a cap. A connection.
              </h2>
            </div>
            <div>
              <p className="max-w-[650px] text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
                The BGN cap is for people who want their support to be visible: Black Googlers, Google teammates, and allies who believe Black tech professionals deserve community, opportunity, and room to lead.
              </p>
              <div className="mt-9 grid gap-0 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <article key={benefit.number} className="border-t border-black/15 py-5 sm:mr-5 sm:py-6 last:sm:mr-0">
                    <p className="text-xs font-bold text-black/45">{benefit.number}</p>
                    <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em]">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/65">{benefit.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="bgn-story" aria-labelledby="story-title" className="scroll-mt-8 bg-[#171717] text-white">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[0.7fr_1.3fr] md:items-end md:gap-16 lg:px-12 lg:py-24">
            <div>
              <p className="mb-4 text-[0.67rem] font-bold uppercase tracking-[0.2em] text-[#d4e878]">What BGN stands for</p>
              <h2 id="story-title" className="max-w-[420px] text-4xl font-semibold leading-[1] tracking-[-0.06em] sm:text-5xl">
                Black Googler Network.
              </h2>
            </div>
            <div className="max-w-[720px]">
              <p className="text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                BGN is a global Google employee resource group that works to cultivate Black leaders at Google and beyond, empower communities, and help the technology industry reflect the people who use it.
              </p>
              <p className="mt-5 text-sm leading-6 text-white/60">
                Whether you are part of the network or an ally, this cap makes your connection visible and gives you a starting point to learn about the work behind the letters.
              </p>
              <a href={networkStoryUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/35 px-5 py-3 text-sm font-semibold transition-colors hover:border-[#d4e878] hover:bg-[#d4e878] hover:text-[#171717]">
                Read BGN’s story at Google <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-label="Explore the BGN cap" className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="text-sm font-semibold text-black/65">A visible mark. A bigger meaning.</p>
          <a href="#top" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#151515] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Explore the BGN cap <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-black/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span className="font-black tracking-[-0.08em] text-[#151515]">BGN</span>
          <span>For Googlers, BGN community members, and allies.</span>
          <a href={networkStoryUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Learn about the network ↗</a>
        </div>
      </footer>
    </div>
  );
}
