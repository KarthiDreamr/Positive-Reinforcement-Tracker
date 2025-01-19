import React from 'react';
import { TaskSetup } from './components/TaskSetup';
import { TaskNameSetup } from './components/TaskNameSetup';
import { Tracker } from './components/Tracker';
import { Layout } from './components/Layout';
import { useAudio } from './hooks/useAudio';
import { storage } from './utils/storage';

function App() {
  const [totalTasks, setTotalTasks] = React.useState<number | null>(() => storage.getTotalTasks());
  const [reward, setReward] = React.useState<string>(() => storage.getReward());
  const [taskNames, setTaskNames] = React.useState<string[]>(() => storage.getTaskNames());
  const [useTaskNames, setUseTaskNames] = React.useState<boolean>(() => storage.getUseTaskNames());
  const [useTimer, setUseTimer] = React.useState<boolean>(() => storage.getUseTimer());
  const [timerMinutes, setTimerMinutes] = React.useState<number>(() => storage.getTimerMinutes());
  const { soundEnabled, toggleSound } = useAudio();

  const handleStart = (tasks: number, rewardText: string, enableTaskNames: boolean, enableTimer: boolean, minutes: number) => {
    setTotalTasks(tasks);
    setReward(rewardText);
    setUseTaskNames(enableTaskNames);
    setUseTimer(enableTimer);
    setTimerMinutes(minutes);
    storage.setUseTaskNames(enableTaskNames);
    storage.setUseTimer(enableTimer);
    storage.setTimerMinutes(minutes);
    
    if (!enableTaskNames) {
      storage.setTotalTasks(tasks);
      storage.setReward(rewardText);
      storage.setTaskNames([]);
      storage.setCompletedTasks(0);
      setTaskNames([]);
    }
  };

  const handleTaskNamesComplete = (names: string[]) => {
    storage.setTotalTasks(totalTasks);
    storage.setReward(reward);
    storage.setTaskNames(names);
    storage.setCompletedTasks(0);
    setTaskNames(names);
  };

  const handleReset = () => {
    storage.clearAll();
    setTotalTasks(null);
    setReward('');
    setTaskNames([]);
    setUseTaskNames(false);
    setUseTimer(false);
    setTimerMinutes(30);
  };

  const handleBack = () => {
    setTotalTasks(null);
    setReward('');
  };

  return (
    <Layout
      onReset={handleReset}
      soundEnabled={soundEnabled}
      onSoundToggle={toggleSound}
    >
      <div className="w-full max-w-md">
        {totalTasks === null ? (
          <TaskSetup onStart={handleStart} />
        ) : useTaskNames && taskNames.length === 0 ? (
          <TaskNameSetup
            totalTasks={totalTasks}
            onComplete={handleTaskNamesComplete}
            onBack={handleBack}
          />
        ) : (
          <Tracker
            totalTasks={totalTasks}
            reward={reward}
            onReset={handleReset}
            taskNames={taskNames}
            showTaskNames={useTaskNames}
            useTimer={useTimer}
            timerMinutes={timerMinutes}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;