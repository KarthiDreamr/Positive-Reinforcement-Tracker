import React from 'react';
import { CircularProgress } from './CircularProgress';
import { RewardDisplay } from './RewardDisplay';
import { Timer } from './Timer';
import { CheckCircle, Trophy } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { useConfetti } from '../hooks/useConfetti';
import { storage } from '../utils/storage';

interface TrackerProps {
  totalTasks: number;
  reward?: string;
  onReset: () => void;
  taskNames: string[];
  showTaskNames: boolean;
  useTimer: boolean;
  timerMinutes: number;
  userId?: string;
}

export const Tracker: React.FC<TrackerProps> = ({
  totalTasks,
  reward,
  onReset,
  taskNames,
  showTaskNames,
  useTimer,
  timerMinutes,
  userId,
}) => {
  const [completedTasks, setCompletedTasks] = React.useState(() => storage.getCompletedTasks());
  const { playSound, soundEnabled } = useAudio();
  const { triggerConfetti } = useConfetti();
  const percentage = (completedTasks / totalTasks) * 100;

  const handleComplete = async () => {
    if (completedTasks < totalTasks) {
      const newCompleted = completedTasks + 1;
      if (userId) {
        await storage.setCompletedTasks(newCompleted, userId);
      } else {
        storage.setCompletedTasks(newCompleted);
      }
      setCompletedTasks(newCompleted);
      
      if (soundEnabled) {
        if (newCompleted === totalTasks) {
          playSound('complete');
        } else {
          playSound('progress');
        }
      }
      
      triggerConfetti(newCompleted === totalTasks);
    }
  };

  const currentTaskName = showTaskNames && completedTasks < totalTasks ? taskNames[completedTasks] : null;

  return (
    <div className="bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm p-8 rounded-xl shadow-lg w-full text-center">
      <div className="flex justify-center mb-8">
        <CircularProgress percentage={percentage} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {completedTasks === totalTasks ? 'All Tasks Completed!' : 'Keep Going!'}
        </h2>
        <p className="text-gray-600 dark:text-slate-400">
          {completedTasks} of {totalTasks} tasks completed
        </p>
        {currentTaskName && (
          <p className="mt-4 text-lg font-medium text-indigo-600 dark:text-emerald-400">
            Current Task: {currentTaskName}
          </p>
        )}
        <RewardDisplay reward={reward || ''} isComplete={completedTasks === totalTasks} />
      </div>

      {completedTasks === totalTasks ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
          </div>
          <button
            onClick={onReset}
            className="w-full bg-indigo-600 dark:bg-emerald-600 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-emerald-700 transition-colors font-medium"
          >
            Start New Tracker
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleComplete}
            className="w-full bg-indigo-600 dark:bg-emerald-600 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Complete
          </button>
          <Timer enabled={useTimer} initialMinutes={timerMinutes} userId={userId} />
        </>
      )}
    </div>
  );
};