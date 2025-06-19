import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

import soundAhShit from './sounds/ahshit.mp3';
import airHorn from './sounds/airhorn.mp3';
import applause from './sounds/applause.mp3';
import soloClap from './sounds/soloClap.mp3';
import crash from './sounds/crash.mp3';
import glass from './sounds/glass.mp3';
import news from './sounds/news.mp3';
import buzzer from './sounds/buzzer.mp3';

const pads = [
  { id: 1, label: 'Ah Shit', sound: soundAhShit },
  { id: 2, label: 'AirHorn', sound: airHorn },
  { id: 3, label: 'Applause', sound: applause },
  { id: 4, label: 'SoloClap', sound: soloClap },
  { id: 5, label: 'Crash', sound: crash },
  { id: 6, label: 'Glass', sound: glass },
  { id: 7, label: 'News', sound: news },
  { id: 8, label: 'Buzzer', sound: buzzer },
];

export default function SoundPad() {
  const audioContextRef = useRef(null);
  const buffersRef = useRef({});
  const sourcesRef = useRef({});

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const loadBuffers = async () => {
      for (const pad of pads) {
        const response = await fetch(pad.sound);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        buffersRef.current[pad.id] = audioBuffer;
      }
    };
    loadBuffers();
  }, []);

  const playSound = (padId) => {
    const context = audioContextRef.current;
    const buffer = buffersRef.current[padId];
    if (!context || !buffer) return;

    // Zastavíme předešlý source pokud existuje
    if (sourcesRef.current[padId]) {
      try {
        sourcesRef.current[padId].stop();
      } catch (e) {}
    }

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
    sourcesRef.current[padId] = source;
  };

  return (
    <div className="pad-grid">
      {pads.map((pad) => (
        <motion.div key={pad.id} whileTap={{ scale: 0.95 }} className="pad-button">
          <button
            className="pad-label"
            onClick={() => playSound(pad.id)}
            touch-action="manipulation"
          >
            {pad.label}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
