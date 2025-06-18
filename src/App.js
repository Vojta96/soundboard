import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import soundAhShit from './sounds/ahshit.mp3';
import airHorn from './sounds/airhorn.mp3';
import applause from './sounds/applause.mp3';
import soloClap from './sounds/soloClap.mp3';
import crash from './sounds/crash.mp3';
import glass from './sounds/glass.mp3';
import news from './sounds/news.mp3';
import buzzer from './sounds/buzzer.mp3';
import './App.css';

const pads = [
  { id: 1, label: 'Ah Shit, here we go again', sound: soundAhShit },
  { id: 2, label: 'AirHorn', sound: airHorn },
  { id: 3, label: 'Applause', sound: applause },
  { id: 4, label: 'SoloClap', sound: soloClap },
  { id: 5, label: 'Crash', sound: crash },
  { id: 6, label: 'Glass', sound: glass },
  { id: 7, label: 'News', sound: news },
  { id: 8, label: 'Buzzer', sound: buzzer },
];

export default function SoundPad() {
  const audioRefs = useRef(pads.map(() => null));

  const stopAllSounds = () => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const playSound = (index) => {
    stopAllSounds();
    const currentAudio = audioRefs.current[index];
    if (currentAudio) {
      currentAudio.play();
    }
  };

  return (
    <div className="pad-grid">
      {pads.map((pad, index) => (
        <motion.div
          key={pad.id}
          whileTap={{ scale: 0.95 }}
          className="pad-button"
        >
          <button
            className="pad-label"
            onClick={() => playSound(index)}
            touch-action="manipulation"
          >
            {pad.label}
            <audio ref={(el) => (audioRefs.current[index] = el)} src={pad.sound} preload="auto" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
