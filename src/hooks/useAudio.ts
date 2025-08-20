import { useState, useCallback, useRef } from 'react';
import { storage } from '../utils/storage';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => storage.getSoundEnabled());
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({
    progress: null,
    complete: null,
    timeout: null
  });

  const initAudio = useCallback((type: 'progress' | 'complete' | 'timeout') => {
    if (!audioRefs.current[type]) {
      const audio = new Audio();
      switch (type) {
        case 'progress':
          audio.src = 'https://pixabay.com/sound-effects/download/notification-for-game-scenes-132473.mp3';
          audio.volume = 0.3;
          break;
        case 'complete':
          audio.src = 'https://pixabay.com/sound-effects/download/success-1-6297.mp3';
          audio.volume = 0.7;
          break;
        case 'timeout':
          audio.src = 'https://pixabay.com/sound-effects/download/wrong-answer-126515.mp3';
          audio.volume = 0.7;
          break;
      }
      audioRefs.current[type] = audio;
    }
    return audioRefs.current[type];
  }, []);

  const playSound = useCallback((type: 'progress' | 'complete' | 'timeout') => {
    if (!soundEnabled) return;
    
    const audio = initAudio(type);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, [soundEnabled, initAudio]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      storage.setSoundEnabled(newValue);
      
      // Stop all playing sounds when disabling
      if (!newValue) {
        Object.values(audioRefs.current).forEach(audio => {
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        });
      }
      
      return newValue;
    });
  }, []);

  return {
    soundEnabled,
    playSound,
    toggleSound
  };
};