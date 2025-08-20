import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const STORAGE_KEYS = {
  TOTAL_TASKS: 'progress_tracker_total_tasks',
  COMPLETED_TASKS: 'progress_tracker_completed_tasks',
  REWARD: 'progress_tracker_reward',
  TASK_NAMES: 'progress_tracker_task_names',
  USE_TASK_NAMES: 'progress_tracker_use_task_names',
  USE_TIMER: 'progress_tracker_use_timer',
  TIMER_MINUTES: 'progress_tracker_timer_minutes',
  THEME: 'progress_tracker_theme',
  SOUND_ENABLED: 'progress_tracker_sound_enabled',
} as const;

const syncWithFirestore = async (userId: string, data: any) => {
  if (!userId) return;
  
  try {
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, data, { merge: true });
  } catch (error) {
    console.error('Error syncing with Firestore:', error);
  }
};

const loadFromFirestore = async (userId: string) => {
  if (!userId) return null;
  
  try {
    const userDoc = doc(db, 'users', userId);
    const docSnap = await getDoc(userDoc);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error loading from Firestore:', error);
    return null;
  }
};

export const storage = {
  getTotalTasks: (): number | null => {
    const value = localStorage.getItem(STORAGE_KEYS.TOTAL_TASKS);
    return value ? Number(value) : null;
  },

  setTotalTasks: async (tasks: number | null, userId?: string): Promise<void> => {
    if (tasks === null) {
      localStorage.removeItem(STORAGE_KEYS.TOTAL_TASKS);
      if (userId) {
        await syncWithFirestore(userId, { totalTasks: null });
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.TOTAL_TASKS, String(tasks));
      if (userId) {
        await syncWithFirestore(userId, { totalTasks: tasks });
      }
    }
  },

  getCompletedTasks: (): number => {
    return Number(localStorage.getItem(STORAGE_KEYS.COMPLETED_TASKS) || 0);
  },

  setCompletedTasks: async (tasks: number, userId?: string): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, String(tasks));
    if (userId) {
      await syncWithFirestore(userId, { completedTasks: tasks });
    }
  },

  getReward: (): string => {
    return localStorage.getItem(STORAGE_KEYS.REWARD) || '';
  },

  setReward: async (reward: string, userId?: string): Promise<void> => {
    if (!reward) {
      localStorage.removeItem(STORAGE_KEYS.REWARD);
      if (userId) {
        await syncWithFirestore(userId, { reward: '' });
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.REWARD, reward);
      if (userId) {
        await syncWithFirestore(userId, { reward });
      }
    }
  },

  getTaskNames: (): string[] => {
    const names = localStorage.getItem(STORAGE_KEYS.TASK_NAMES);
    return names ? JSON.parse(names) : [];
  },

  setTaskNames: async (names: string[], userId?: string): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.TASK_NAMES, JSON.stringify(names));
    if (userId) {
      await syncWithFirestore(userId, { taskNames: names });
    }
  },

  getUseTaskNames: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.USE_TASK_NAMES) === 'true';
  },

  setUseTaskNames: async (useTaskNames: boolean, userId?: string): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.USE_TASK_NAMES, String(useTaskNames));
    if (userId) {
      await syncWithFirestore(userId, { useTaskNames });
    }
  },

  getUseTimer: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.USE_TIMER) === 'true';
  },

  setUseTimer: async (useTimer: boolean, userId?: string): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.USE_TIMER, String(useTimer));
    if (userId) {
      await syncWithFirestore(userId, { useTimer });
    }
  },

  getTimerMinutes: (): number => {
    return Number(localStorage.getItem(STORAGE_KEYS.TIMER_MINUTES) || 30);
  },

  setTimerMinutes: async (minutes: number, userId?: string): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.TIMER_MINUTES, String(minutes));
    if (userId) {
      await syncWithFirestore(userId, { timerMinutes: minutes });
    }
  },

  getTheme: (): 'system' | 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'system' | 'light' | 'dark') || 'system';
  },

  setTheme: (theme: 'system' | 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  getSoundEnabled: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) !== 'false';
  },

  setSoundEnabled: (enabled: boolean): void => {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
  },

  clearAll: async (userId?: string): Promise<void> => {
    localStorage.removeItem(STORAGE_KEYS.TOTAL_TASKS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_TASKS);
    localStorage.removeItem(STORAGE_KEYS.REWARD);
    localStorage.removeItem(STORAGE_KEYS.TASK_NAMES);
    localStorage.removeItem(STORAGE_KEYS.USE_TASK_NAMES);
    localStorage.removeItem(STORAGE_KEYS.USE_TIMER);
    localStorage.removeItem(STORAGE_KEYS.TIMER_MINUTES);
    
    if (userId) {
      try {
        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);
      } catch (error) {
        console.error('Error clearing Firestore data:', error);
      }
    }
  },

  loadUserData: async (userId: string): Promise<void> => {
    const data = await loadFromFirestore(userId);
    if (data) {
      if (data.totalTasks !== undefined) storage.setTotalTasks(data.totalTasks);
      if (data.completedTasks !== undefined) storage.setCompletedTasks(data.completedTasks);
      if (data.reward !== undefined) storage.setReward(data.reward);
      if (data.taskNames !== undefined) storage.setTaskNames(data.taskNames);
      if (data.useTaskNames !== undefined) storage.setUseTaskNames(data.useTaskNames);
      if (data.useTimer !== undefined) storage.setUseTimer(data.useTimer);
      if (data.timerMinutes !== undefined) storage.setTimerMinutes(data.timerMinutes);
    }
  }
};