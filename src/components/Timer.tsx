import React from 'react';
import { Clock } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface TimerProps {
  enabled: boolean;
  initialMinutes: number;
}

export const Timer: React.FC<TimerProps> = ({ enabled, initialMinutes }) => {
  const [seconds, setSeconds] = React.useState(initialMinutes * 60);
  const { playSound } = useAudio();
  const isExpired = seconds <= 0;
  
  React.useEffect(() => {
    if (!enabled || isExpired) return;
    
    const interval = setInterval(() => {
      setSeconds(s => {
        const newSeconds = s - 1;
        if (newSeconds === 0) {
          playSound('timeout');
        }
        return newSeconds;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [enabled, isExpired, playSound]);
  
  const formatTime = (totalSeconds: number) => {
    if (totalSeconds <= 0) return '00:00:00';
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  if (!enabled) return null;
  
  return (
    <div className={`flex items-center justify-center gap-3 mt-4 ${isExpired ? 'text-red-600' : 'text-gray-600'}`}>
      <Clock className="w-5 h-5" />
      <span className={`font-mono text-lg ${isExpired ? 'animate-pulse' : ''}`}>
        {formatTime(seconds)}
      </span>
    </div>
  );
};