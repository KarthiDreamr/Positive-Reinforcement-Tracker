import { useState, useMemo } from 'react';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const sounds = useMemo(() => ({
    progress: new Audio('https://pixabay.com/sound-effects/download/notification-for-game-scenes-132473.mp3'),
    complete: new Audio('https://pixabay.com/sound-effects/download/success-1-6297.mp3'),
    timeout: new Audio('https://pixabay.com/sound-effects/download/wrong-answer-126515.mp3')
  }), []);

  const playSound = (type: 'progress' | 'complete' | 'timeout') => {
    if (!soundEnabled) return;
    
    const audio = sounds[type];
    audio.currentTime = 0;
    audio.volume = type === 'progress' ? 0.3 : 0.7;
    audio.play().catch(() => {});
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      const audio = new Audio();
      audio.play().catch(() => {});
    }
  };

  return {
    soundEnabled,
    playSound,
    toggleSound
  };
};