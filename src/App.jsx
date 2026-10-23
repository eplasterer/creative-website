import React, { useEffect, useState } from 'react';
import './App.css';

const moodOptions = [
  { id: 'cozy', label: 'Cozy & easy', icon: '☼' },
  { id: 'laugh', label: 'Make me laugh', icon: '☺' },
  { id: 'edge', label: 'Keep me guessing', icon: '✦' },
  { id: 'inspired', label: 'Leave me inspired', icon: '↗' },
];

const genreOptions = ['Comedy', 'Drama', 'Mystery', 'Sci-Fi', 'Romance', 'Adventure'];
const serviceOptions = ['Netflix', 'Hulu', 'Prime Video', 'Max', 'Disney+', 'Peacock'];
const timeOptions = [
  { id: '45', label: 'Quick pick', detail: 'Under 45 min' },
  { id: '75', label: 'About an hour', detail: 'Up to 75 min' },
  { id: '130', label: 'Long night', detail: 'Any runtime' },
];

const sampleCatalog = [
  {
    title: 'Room for One More', kind: 'Film', minutes: 54,
    genres: ['Comedy', 'Romance'], moods: ['cozy', 'laugh'], services: ['Netflix', 'Hulu'],
    art: 'sunroom', colors: ['#ffb37d', '#c64e54'],
    description: 'Two mismatched roommates turn a surprise blackout into a rooftop dinner.',
  },
  {
    title: 'Weekend Forecast', kind: 'Series episode', minutes: 42,
    genres: ['Comedy'], moods: ['cozy', 'laugh'], services: ['Prime Video', 'Peacock'],
    art: 'weekend', colors: ['#a7d9c8', '#3d7f73'],
    description: 'A tiny seaside town makes big plans for one very unpredictable Saturday.',
  },
  {
    title: 'Static Between Us', kind: 'Film', minutes: 76,
    genres: ['Mystery', 'Drama'], moods: ['edge', 'inspired'], services: ['Netflix', 'Max'],
    art: 'static', colors: ['#b8a6ed', '#514477'],
    description: 'A late-night radio host follows a signal that seems to know her callers.',
  },
  {
    title: 'Orbit of Us', kind: 'Film', minutes: 88,
    genres: ['Sci-Fi', 'Romance'], moods: ['inspired', 'cozy'], services: ['Disney+', 'Hulu'],
    art: 'orbit', colors: ['#98b8ef', '#4b5e9f'],
    description: 'Two interns on a space station find a surprising way to get back in sync.',
  },
  {
    title: 'After Hours, Before Morning', kind: 'Series episode', minutes: 64,
    genres: ['Mystery', 'Drama'], moods: ['edge'], services: ['Max', 'Prime Video'],
    art: 'after-hours', colors: ['#f39a80', '#763d60'],
    description: 'A closed campus library, one missing book, and a very long night shift.',
  },
  {
    title: 'The Little Things We Keep', kind: 'Film', minutes: 63,
    genres: ['Drama', 'Romance'], moods: ['cozy', 'inspired'], services: ['Hulu', 'Netflix'],
    art: 'little-things', colors: ['#f0d18c', '#b76c4e'],
    description: 'A box of old postcards helps two cousins see their hometown differently.',
  },
  {
    title: 'The Detour Club', kind: 'Series episode', minutes: 82,
    genres: ['Adventure', 'Comedy'], moods: ['laugh', 'inspired'], services: ['Disney+', 'Peacock'],
    art: 'detour', colors: ['#b5cf76', '#5a7542'],
    description: 'Four friends take the scenic route and discover a town they almost missed.',
  },
  {
    title: 'Last Stop, Lantern Street', kind: 'Film', minutes: 96,
    genres: ['Mystery', 'Romance'], moods: ['edge', 'cozy'], services: ['Prime Video', 'Max'],
    art: 'lantern', colors: ['#e7a25f', '#60486c'],
    description: 'A missed train leaves two strangers piecing together a neighborhood secret.',
  },
];

function App() {
  const [mood, setMood] = useState('cozy');
  const [genres, setGenres] = useState(['Comedy']);
  const [watchTime, setWatchTime] = useState('75');
  const [services, setServices] = useState(['Netflix', 'Hulu']);
  const [groupMode, setGroupMode] = useState(false);
  const [groupMood, setGroupMood] = useState('laugh');
  const [picks, setPicks] = useState(null);

  useEffect(() => {
    document.title = 'ShowDecider | Less scrolling, more watching';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = 'A movie and show recommendation concept that turns your mood, time, and shared preferences into a short, explainable watchlist.';
  }, []);

  function toggleChoice(value, selected, update) {
    update(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  }

  function buildShortlist() {
    const timeLimit = Number(watchTime);
    const ranked = sampleCatalog.map((title) => {
      const matchedGenres = title.genres.filter((genre) => genres.includes(genre));
      const matchedServices = services.length ? title.services.filter((service) => services.includes(service)) : [];
      const moodMatch = title.moods.includes(mood);
      const groupMatch = groupMode && title.moods.includes(groupMood);
      const fitsTime = title.minutes <= timeLimit;
      let score = matchedGenres.length * 3;
      score += moodMatch ? 5 : 0;
      score += groupMatch ? 4 : 0;
      score += fitsTime ? 3 : -Math.min(4, Math.ceil((title.minutes - timeLimit) / 30));
      score += services.length ? (matchedServices.length ? 4 : -1) : 0;

      const reasons = [];
      reasons.push(moodMatch ? 'Fits the ' + moodOptions.find((option) => option.id === mood).label.toLowerCase() + ' mood.' : 'Adds a different mood to your shortlist.');
      if (matchedGenres.length) reasons.push('Includes ' + matchedGenres.join(' and ') + ' picks you selected.');
      else if (genres.length) reasons.push('Adds a little variety beyond your selected genres.');
      if (groupMode) reasons.push(groupMatch ? 'Also fits your group’s ' + moodOptions.find((option) => option.id === groupMood).label.toLowerCase() + ' vibe.' : 'Gives the group another kind of option to consider.');
      if (fitsTime) reasons.push('Fits your available viewing time.');
      if (matchedServices.length) reasons.push('Example service match: ' + matchedServices.join(' and ') + '.');

      return { ...title, score, reasons: reasons.slice(0, 3), matchedServices };
    });

    const shortlist = ranked.sort((a, b) => b.score - a.score || a.minutes - b.minutes).slice(0, 4);
    setPicks(shortlist);
    window.setTimeout(() => {
      const results = document.getElementById('results');
      if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function scrollToFinder() {
    const finder = document.getElementById('finder');
    if (finder) finder.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="showdecider-site">
      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="ShowDecider home">
          <span className="brand-icon" aria-hidden="true">SD</span>
          <span className="brand-name">Show<span>Decider</span></span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#finder">Try the demo</a>
          <a href="#about">Our idea</a>
        </nav>
        <a className="header-cta" href="#finder">Find a pick <span aria-hidden="true">↗</span></a>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />A SMALL LIST FOR A BIG NIGHT IN</p>
            <h1 id="hero-title">Less scrolling.<br /><em>More watching.</em></h1>
            <p className="hero-description">ShowDecider turns your mood, free time, and streaming picks into a short list of things you could watch next.</p>
            <div className="hero-actions">
              <a className="button button-lime" href="#finder">Find your next watch <span aria-hidden="true">↓</span></a>
              <a className="text-link" href="#how">See how it works <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note">Made for solo nights, couples, friends, and the roommate group chat.</p>
          </div>

          <div className="hero-visual" aria-label="Example ShowDecider shortlist preview">
            <div className="preview-topline"><span>TONIGHT’S SHORTLIST</span><span className="preview-live"><i /> CONCEPT PREVIEW</span></div>
            <div className="preview-content">
              <div className="preview-poster" aria-hidden="true">
                <span className="poster-overline">A SHOWDECIDER SAMPLE</span>
                <span className="poster-sun" />
                <span className="preview-poster-title">Room<br />for one<br />more</span>
                <span className="preview-poster-meta">A FEEL-GOOD FILM · 54 MIN</span>
              </div>
              <div className="preview-details">
                <span className="match-label"><span>✦</span> YOUR KIND OF NIGHT</span>
                <h2>Room for<br />One More</h2>
                <p>A cozy comedy with enough room for the whole group.</p>
                <div className="preview-tags"><span>COZY</span><span>54 MIN</span><span>GROUP FIT</span></div>
                <div className="why-preview"><span className="why-star">✦</span><p><strong>Why this title?</strong><br />It matches your shared mood and viewing window.</p></div>
              </div>
            </div>
            <div className="preview-footer"><span>01 / 04</span><span>FOUR PICKS. ZERO ENDLESS SCROLLING.</span></div>
          </div>
        </section>

        <div className="signal-strip" aria-label="ShowDecider recommendation inputs">
          <span>MOOD</span><b>+</b><span>GENRE</span><b>+</b><span>TIME</span><b>+</b><span>YOUR PEOPLE</span><b>=</b><strong>A BETTER STARTING POINT</strong>
        </div>

        <section className="how-section section-wrap" id="how" aria-labelledby="how-title">
          <div className="section-heading">
            <p className="eyebrow">01 / HOW IT WORKS</p>
            <h2 id="how-title">Start with your night.<br /><em>We’ll find the next thing.</em></h2>
            <p className="section-summary">A few quick answers become a shortlist you can actually choose from—with a reason behind every pick.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span><span className="step-icon step-icon-mood" aria-hidden="true">☼</span>
              <h3>Set the vibe</h3><p>Choose a mood, a couple of genres, and the time you have tonight.</p>
              <span className="step-caption">MOOD · GENRE · TIME</span>
            </article>
            <article className="step-card">
              <span className="step-number">02</span><span className="step-icon step-icon-group" aria-hidden="true">◎</span>
              <h3>Add your people</h3><p>Watching with friends or a partner? Bring a second point of view into the mix.</p>
              <span className="step-caption">SOLO OR SHARED</span>
            </article>
            <article className="step-card">
              <span className="step-number">03</span><span className="step-icon step-icon-pick" aria-hidden="true">✦</span>
              <h3>Get a short list</h3><p>See four starting points, then open “Why this title?” to understand each match.</p>
              <span className="step-caption">THREE TO FIVE PICKS</span>
            </article>
          </div>
        </section>

        <section className="finder-section" id="finder" aria-labelledby="finder-title">
          <div className="finder-layout section-wrap">
            <div className="finder-intro">
              <p className="eyebrow eyebrow-light">02 / MAKE IT YOURS</p>
              <h2 id="finder-title">What sounds<br />good <em>tonight?</em></h2>
              <p>Build a tiny watchlist around the way you feel, the time you have, and who’s watching with you.</p>
              <div className="finder-side-note"><span>✦</span><p><strong>Designed to reduce choice overload.</strong><br />A focused shortlist keeps the decision moving without making the night feel like homework.</p></div>
            </div>

            <div className="finder-card">
              <div className="finder-card-head"><div><span className="card-overline">SHOWDECIDER / INTERACTIVE CONCEPT</span><h3>Build your shortlist</h3></div><span className="card-step">4 QUICK INPUTS</span></div>

              <div className="finder-field">
                <div className="field-title"><span>01</span><div><h4>What’s the mood?</h4><p>Pick the feeling you want to leave with.</p></div></div>
                <div className="choice-grid mood-choices">
                  {moodOptions.map((option) => (
                    <button key={option.id} type="button" className={'choice-button mood-choice' + (mood === option.id ? ' is-selected' : '')} aria-pressed={mood === option.id} onClick={() => setMood(option.id)}>
                      <span className="choice-icon" aria-hidden="true">{option.icon}</span>{option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="finder-field">
                <div className="field-title"><span>02</span><div><h4>Any favorite genres?</h4><p>Choose one or a few. We’ll keep the list varied.</p></div></div>
                <div className="chip-row">
                  {genreOptions.map((genre) => (
                    <button key={genre} type="button" className={'select-chip' + (genres.includes(genre) ? ' is-selected' : '')} aria-pressed={genres.includes(genre)} onClick={() => toggleChoice(genre, genres, setGenres)}>{genre}</button>
                  ))}
                </div>
              </div>

              <div className="finder-columns">
                <div className="finder-field">
                  <div className="field-title"><span>03</span><div><h4>How much time?</h4><p>Choose your viewing window.</p></div></div>
                  <div className="time-options">
                    {timeOptions.map((option) => (
                      <button key={option.id} type="button" className={'time-choice' + (watchTime === option.id ? ' is-selected' : '')} aria-pressed={watchTime === option.id} onClick={() => setWatchTime(option.id)}>
                        <span className="time-radio" /><span><strong>{option.label}</strong><small>{option.detail}</small></span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="finder-field">
                  <div className="field-title"><span>04</span><div><h4>Where do you watch?</h4><p>Pick services you already use.</p></div></div>
                  <div className="chip-row service-chips">
                    {serviceOptions.map((service) => (
                      <button key={service} type="button" className={'select-chip' + (services.includes(service) ? ' is-selected' : '')} aria-pressed={services.includes(service)} onClick={() => toggleChoice(service, services, setServices)}>{service}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group-picker">
                <div className="group-picker-copy"><span className="group-icon" aria-hidden="true">◎</span><div><h4>Choosing with other people?</h4><p>Turn on group mode to add a second mood.</p></div></div>
                <button type="button" role="switch" aria-checked={groupMode} className={'switch' + (groupMode ? ' is-on' : '')} onClick={() => setGroupMode(!groupMode)}><span className="switch-knob" /><span className="sr-only">Group mode</span></button>
              </div>
              {groupMode && (
                <div className="group-mood-panel">
                  <p className="group-mood-label">What is the group in the mood for?</p>
                  <div className="chip-row">
                    {moodOptions.map((option) => (
                      <button key={option.id} type="button" className={'select-chip' + (groupMood === option.id ? ' is-selected' : '')} aria-pressed={groupMood === option.id} onClick={() => setGroupMood(option.id)}>{option.label}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="finder-submit-row"><button type="button" className="button button-dark" onClick={buildShortlist}>Show me four picks <span aria-hidden="true">↗</span></button><span>YOUR ANSWERS, A SHORTER LIST</span></div>
              <p className="concept-disclaimer">Concept preview: titles and service tags are illustrative. The site isn’t connected to live streaming catalogs.</p>
            </div>
          </div>
        </section>

        {picks && (
          <section className="results-section section-wrap" id="results" aria-live="polite" aria-labelledby="results-title">
            <div className="results-head"><div><p className="eyebrow">03 / YOUR SHORTLIST</p><h2 id="results-title">Four ways to start<br /><em>your night.</em></h2></div><button className="edit-answers" type="button" onClick={scrollToFinder}>Edit my answers <span aria-hidden="true">↑</span></button></div>
            <div className="results-grid">
              {picks.map((pick, index) => (
                <article className="result-card" key={pick.title}>
                  <div className={'result-poster poster-' + pick.art} style={{ '--poster-one': pick.colors[0], '--poster-two': pick.colors[1] }} aria-hidden="true">
                    <span className="poster-label">SAMPLE PICK / 0{index + 1}</span><span className="poster-shape" />
                    <span className="poster-title">{pick.title}</span><span className="poster-footer">{pick.kind.toUpperCase()} · {pick.minutes} MIN</span>
                  </div>
                  <div className="result-card-content"><div className="result-tags"><span>{pick.genres.join(' / ')}</span><span>{pick.minutes} MIN</span></div><h3>{pick.title}</h3><p className="result-description">{pick.description}</p>
                    <details className="why-details"><summary>Why this title?<span aria-hidden="true">+</span></summary><ul>{pick.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></details>
                    <div className="service-match"><span>EXAMPLE SERVICE TAG</span><strong>{pick.matchedServices.length ? pick.matchedServices.join(' · ') : 'No sample overlap'}</strong></div>
                  </div>
                </article>
              ))}
            </div>
            <p className="results-footnote">These fictional sample picks demonstrate the experience. A finished service would verify current availability before recommending a title.</p>
          </section>
        )}

        <section className="audience-section section-wrap" id="about" aria-labelledby="audience-title">
          <div className="audience-heading"><p className="eyebrow">04 / MADE FOR REAL-LIFE NIGHTS</p><h2 id="audience-title">One screen.<br /><em>Different opinions.</em></h2><p>ShowDecider is a concept for college students and young adults who want an easier way to choose what to watch—alone or together.</p></div>
          <div className="audience-cards">
            <article><span>01 / SOLO</span><h3>Just for you</h3><p>Skip the scroll when you know the mood but can’t land on a title.</p></article>
            <article><span>02 / TWO</span><h3>Date-night truce</h3><p>Blend two points of view into a handful of options you can agree on.</p></article>
            <article><span>03 / GROUP</span><h3>Roommate rotation</h3><p>Give the group chat a starting point everyone can react to.</p></article>
          </div>
        </section>

        <section className="promise-band"><div className="promise-mark" aria-hidden="true">✳</div><div><p className="eyebrow eyebrow-light">THE SHOWDECIDER PROMISE</p><h2>Spend less time choosing<br />and more time <em>enjoying.</em></h2></div><a href="#finder" className="button button-outline">Try the concept <span aria-hidden="true">↑</span></a></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#top" aria-label="ShowDecider back to top"><span className="brand-icon" aria-hidden="true">SD</span><span className="brand-name">Show<span>Decider</span></span></a><p>A movie & show recommendation concept.</p><span>© {new Date().getFullYear()} SHOWDECIDER · CONCEPT PREVIEW</span></footer>
    </div>
  );
}

export default App;
