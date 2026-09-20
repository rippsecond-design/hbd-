/**
 * Ambient Romantic Music Box Synthesizer using Web Audio API
 * Generates warm, dreamy music-box / kalimba-like notes without relying on external MP3 URLs.
 */

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  // Notes frequencies in Hz (sweet, gentle lullaby / acoustic melody)
  // Progression inspired by soft music box chords: C4, E4, G4, A4, B4, C5, D5, E5, F5, G5
  private melody: Array<{ note: number; duration: number }> = [
    // Phrase 1 (Gentle arpeggiated romantic warm melody)
    { note: 261.63, duration: 0.5 }, // C4
    { note: 329.63, duration: 0.5 }, // E4
    { note: 392.00, duration: 0.7 }, // G4
    { note: 523.25, duration: 0.9 }, // C5
    { note: 493.88, duration: 0.5 }, // B4
    { note: 392.00, duration: 0.5 }, // G4
    { note: 440.00, duration: 1.0 }, // A4

    // Phrase 2
    { note: 293.66, duration: 0.5 }, // D4
    { note: 349.23, duration: 0.5 }, // F4
    { note: 440.00, duration: 0.7 }, // A4
    { note: 523.25, duration: 0.8 }, // C5
    { note: 392.00, duration: 1.2 }, // G4

    // Phrase 3 - Happy Birthday motif motif softly tucked in
    { note: 392.00, duration: 0.4 }, // G4
    { note: 392.00, duration: 0.4 }, // G4
    { note: 440.00, duration: 0.8 }, // A4
    { note: 392.00, duration: 0.8 }, // G4
    { note: 523.25, duration: 0.9 }, // C5
    { note: 493.88, duration: 1.3 }, // B4

    { note: 392.00, duration: 0.4 }, // G4
    { note: 392.00, duration: 0.4 }, // G4
    { note: 440.00, duration: 0.8 }, // A4
    { note: 392.00, duration: 0.8 }, // G4
    { note: 587.33, duration: 0.9 }, // D5
    { note: 523.25, duration: 1.4 }, // C5

    // Phrase 4 - Sweet Resolution
    { note: 523.25, duration: 0.5 }, // C5
    { note: 659.25, duration: 0.6 }, // E5
    { note: 587.33, duration: 0.6 }, // D5
    { note: 523.25, duration: 0.6 }, // C5
    { note: 440.00, duration: 0.8 }, // A4
    { note: 392.00, duration: 1.5 }, // G4
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playMusicBoxNote(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;

    // Primary bell oscillator
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Harmonic chime oscillator for metallic sweet ring
    const overtone = this.ctx.createOscillator();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.01, now);

    // Note Envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.28, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.6, duration * 1.5));

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.linearRampToValueAtTime(0.08, now + 0.01);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.3, duration * 0.8));

    osc.connect(noteGain);
    overtone.connect(overtoneGain);

    noteGain.connect(this.masterGain);
    overtoneGain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);

    const stopTime = now + Math.max(1.0, duration * 1.8);
    osc.stop(stopTime);
    overtone.stop(stopTime);
  }

  private step() {
    if (!this.isPlaying) return;

    const current = this.melody[this.noteIndex];
    this.playMusicBoxNote(current.note, current.duration);

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    const interval = current.duration * 750; // comfortable rhythm speed

    this.timerId = window.setTimeout(() => {
      this.step();
    }, interval);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }

  // Play a soft chime sound on button tap or interactions
  public playSparkleChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.6);
      }, idx * 70);
    });
  }
}

export const musicBox = new MusicBoxPlayer();
