import React from 'react';
import { Clock } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { storage } from '../utils/storage';

interface TimerProps {
  enabled: boolean;
  initialMinutes: number;
  userId?: string;
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { enabled, initialMinutes, userId } = props;
  const { playSound } = useAudio();

  // Compute remaining from a persisted absolute deadline (endAt)
  const computeRemaining = React.useCallback(() => {
    const endAt = storage.getTimerEndAt();
    if (!endAt) return initialMinutes * 60;
    const diffMs = endAt - Date.now();
    return Math.max(0, Math.ceil(diffMs / 1000));
  }, [initialMinutes]);

  const [remaining, setRemaining] = React.useState<number>(() => computeRemaining());
  const playedTimeoutRef = React.useRef(false);

  // Ensure a deadline exists when enabled and none is set (self-heal for older data)
  React.useEffect(() => {
    if (!enabled) return;
    const existing = storage.getTimerEndAt();
    if (!existing) {
      const endAt = Date.now() + initialMinutes * 60_000;
      console.debug('[Timer] initializing missing timerEndAt', { initialMinutes, endAt, userId });
      storage.setTimerEndAt(endAt, userId).catch((e) => console.error('Failed to set timerEndAt', e));
      setRemaining(Math.max(0, Math.ceil((endAt - Date.now()) / 1000)));
    } else {
      setRemaining(computeRemaining());
    }
  }, [enabled, initialMinutes, computeRemaining]);

  // Tick using wall-clock math; resilient to refresh/tab sleep
  React.useEffect(() => {
    if (!enabled) return;

    const update = () => {
      const next = computeRemaining();
      setRemaining((prev) => {
        if (prev > 0 && next === 0 && !playedTimeoutRef.current) {
          playedTimeoutRef.current = true;
          playSound('timeout');
        }
        return next;
      });
    };

    update();
    const id = setInterval(update, 1000);

    // Sync across tabs/windows if localStorage changes
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'progress_tracker_timer_end_at') update();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(id);
      window.removeEventListener('storage', onStorage);
    };
  }, [enabled, computeRemaining, playSound]);

  const isExpired = remaining <= 0;

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds <= 0) return '00:00:00';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (!enabled) return null;

  return (
    <div className={`flex items-center justify-center gap-3 mt-4 ${isExpired ? 'text-red-600' : 'text-gray-600'}`}>
      <Clock className="w-5 h-5" />
      <span className={`font-mono text-lg ${isExpired ? 'animate-pulse' : ''}`}>
        {formatTime(remaining)}
      </span>
    </div>
  );
};