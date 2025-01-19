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
}

export const Tracker: React.FC<TrackerProps> = ({
  totalTasks,
  reward,
  onReset,
  taskNames,
  showTaskNames,
  useTimer,
  timerMinutes,
}) => {
  const [completedTasks, setCompletedTasks] = React.useState(() => storage.getCompletedTasks());
  const { playSound } = useAudio();
  const { triggerConfetti } = useConfetti();
  const percentage = (completedTasks / totalTasks) * 100;

  const handleComplete = () => {
    if (completedTasks < totalTasks) {
      const newCompleted = completedTasks + 1;
      storage.setCompletedTasks(newCompleted);
      setCompletedTasks(newCompleted);
      
      if (newCompleted === totalTasks) {
        playSound('complete');
        triggerConfetti(true);
      } else {
        playSound('progress');
        triggerConfetti(false);
      }
    }
  };

  const currentTaskName = showTaskNames && completedTasks < totalTasks ? taskNames[completedTasks] : null;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full text-center">
      <div className="flex justify-center mb-8">
        <CircularProgress percentage={percentage} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {completedTasks === totalTasks ? 'All Tasks Completed!' : 'Keep Going!'}
        </h2>
        <p className="text-gray-600">
          {completedTasks} of {totalTasks} tasks completed
        </p>
        {currentTaskName && (
          <p className="mt-4 text-lg font-medium text-indigo-600">
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
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Start New Tracker
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleComplete}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Complete
          </button>
          <Timer enabled={useTimer} initialMinutes={timerMinutes} />
        </>
      )}
    </div>
  );
};