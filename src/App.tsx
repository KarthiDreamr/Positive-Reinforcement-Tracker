import React, { useEffect } from 'react';
import { TaskSetup } from './components/TaskSetup';
import { TaskNameSetup } from './components/TaskNameSetup';
import { Tracker } from './components/Tracker';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { useAudio } from './hooks/useAudio';
import { useAuth } from './hooks/useAuth';
import { storage } from './utils/storage';

function App() {
  const [totalTasks, setTotalTasks] = React.useState<number | null>(() => storage.getTotalTasks());
  const [reward, setReward] = React.useState<string>(() => storage.getReward());
  const [taskNames, setTaskNames] = React.useState<string[]>(() => storage.getTaskNames());
  const [useTaskNames, setUseTaskNames] = React.useState<boolean>(() => storage.getUseTaskNames());
  const [useTimer, setUseTimer] = React.useState<boolean>(() => storage.getUseTimer());
  const [timerMinutes, setTimerMinutes] = React.useState<number>(() => storage.getTimerMinutes());
  const { soundEnabled, toggleSound } = useAudio();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      storage.loadUserData(user.uid);
    }
  }, [user]);

  const handleStart = async (tasks: number, rewardText: string, enableTaskNames: boolean, enableTimer: boolean, minutes: number) => {
    setTotalTasks(tasks);
    setReward(rewardText);
    setUseTaskNames(enableTaskNames);
    setUseTimer(enableTimer);
    setTimerMinutes(minutes);
    
    if (user) {
      await storage.setUseTaskNames(enableTaskNames, user.uid);
      await storage.setUseTimer(enableTimer, user.uid);
      await storage.setTimerMinutes(minutes, user.uid);
    }
    
    if (!enableTaskNames) {
      if (user) {
        await storage.setTotalTasks(tasks, user.uid);
        await storage.setReward(rewardText, user.uid);
        await storage.setTaskNames([], user.uid);
        await storage.setCompletedTasks(0, user.uid);
      } else {
        storage.setTotalTasks(tasks);
        storage.setReward(rewardText);
        storage.setTaskNames([]);
        storage.setCompletedTasks(0);
      }
      setTaskNames([]);
    }
  };

  const handleTaskNamesComplete = async (names: string[]) => {
    if (user) {
      await storage.setTotalTasks(totalTasks, user.uid);
      await storage.setReward(reward, user.uid);
      await storage.setTaskNames(names, user.uid);
      await storage.setCompletedTasks(0, user.uid);
    } else {
      storage.setTotalTasks(totalTasks);
      storage.setReward(reward);
      storage.setTaskNames(names);
      storage.setCompletedTasks(0);
    }
    setTaskNames(names);
  };

  const handleReset = async () => {
    if (user) {
      await storage.clearAll(user.uid);
    } else {
      storage.clearAll();
    }
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

  if (loading) {
    return (
      <Layout
        onReset={handleReset}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        showReset={false}
        showSettings={false}
      >
        <div className="w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-emerald-400 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout
        onReset={handleReset}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
        showReset={false}
        showSettings={false}
      >
        <Auth />
      </Layout>
    );
  }

  return (
    <Layout onReset={handleReset} soundEnabled={soundEnabled} onSoundToggle={toggleSound}>
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
            userId={user.uid}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;