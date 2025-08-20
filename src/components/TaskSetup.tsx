import React from 'react';
import { Target, Gift, ToggleLeft, ToggleRight, Clock, Plus, Minus } from 'lucide-react';

interface TaskSetupProps {
  onStart: (tasks: number, reward: string, useTaskNames: boolean, useTimer: boolean, timerMinutes: number) => void;
}

export const TaskSetup: React.FC<TaskSetupProps> = ({ onStart }) => {
  const [tasks, setTasks] = React.useState(1);
  const [reward, setReward] = React.useState('');
  const [useTaskNames, setUseTaskNames] = React.useState(false);
  const [useTimer, setUseTimer] = React.useState(false);
  const [timerMinutes, setTimerMinutes] = React.useState(30);

  const handleTaskChange = (value: number) => {
    setTasks(Math.max(1, Math.min(100, value)));
  };

  return (
    <div className="bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="flex items-center justify-center mb-6">
        <Target className="w-12 h-12 text-indigo-600 dark:text-emerald-400" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Set Your Goals
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Number of Tasks
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTaskChange(tasks - 1)}
              className="p-2 rounded-md bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-600/50 text-gray-700 dark:text-slate-300 transition-colors"
              disabled={tasks <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="1"
              max="100"
              value={tasks}
              onChange={(e) => handleTaskChange(parseInt(e.target.value) || 1)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white text-center"
            />
            <button
              onClick={() => handleTaskChange(tasks + 1)}
              className="p-2 rounded-md bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-600/50 text-gray-700 dark:text-slate-300 transition-colors"
              disabled={tasks >= 100}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Reward (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Watch Back to the Future Movie"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
          />
        </div>
        <button
          onClick={() => setUseTaskNames(!useTaskNames)}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-slate-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Name Tasks</span>
          <span className="text-indigo-600 dark:text-emerald-400">
            {useTaskNames ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
          </span>
        </button>
        <div className="space-y-2">
          <button
            onClick={() => setUseTimer(!useTimer)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-slate-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Use Timer</span>
            <span className="text-indigo-600 dark:text-emerald-400">
              {useTimer ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
            </span>
          </button>
          {useTimer && (
            <div className="px-4 py-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timer Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="180"
                value={timerMinutes}
                onChange={(e) => setTimerMinutes(Math.max(1, Math.min(180, parseInt(e.target.value) || 30)))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500 focus:border-indigo-500 dark:focus:border-emerald-500 bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white"
              />
            </div>
          )}
        </div>
        <button
          onClick={() => onStart(tasks, reward, useTaskNames, useTimer, timerMinutes)}
          className="w-full bg-indigo-600 dark:bg-emerald-600 text-white py-3 rounded-md hover:bg-indigo-700 dark:hover:bg-emerald-700 transition-colors font-medium"
        >
          Start Tracking
        </button>
      </div>
    </div>
  );
};