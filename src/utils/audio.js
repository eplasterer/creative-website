// Web Audio synthesizer creating authentic warm vinyl crackle + nostalgic lo-fi chord
class AmbientMusicPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.noiseNode = null;
    this.oscillators = [];
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Master volume
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 1.2);
    this.gainNode.connect(this.ctx.destination);

    // Subtle warm vinyl noise / crackle
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.012;
      if (Math.random() < 0.001) output[i] += (Math.random() * 2 - 1) * 0.06; // subtle vinyl dust pop
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 750;

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start(0);
    this.noiseNode = whiteNoise;

    // Nostalgic Chord Progression (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [164.81, 196.00, 246.94, 293.66], // Em7
      [146.83, 174.61, 220.00, 261.63], // Dm7
      [130.81, 164.81, 196.00, 246.94], // Cmaj7
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isPlaying) return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Gentle tremolo/vibrato (warm analog tape flutter)
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 3.5 + Math.random() * 1.5;
        lfoGain.gain.value = 1.0;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0, this.ctx.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.8);
        oscGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);

        osc.start();
        osc.stop(this.ctx.currentTime + 4.0);
        this.oscillators.push(osc, lfo);
      });

      this.timer = setTimeout(playChord, 3800);
    };

    playChord();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.noiseNode) {
          try { this.noiseNode.stop(); } catch(e) {}
        }
        this.oscillators.forEach(o => {
          try { o.stop(); } catch(e) {}
        });
        this.oscillators = [];
      }, 500);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }
}

export const ambientPlayer = new AmbientMusicPlayer();
