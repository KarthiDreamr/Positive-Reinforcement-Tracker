const STORAGE_KEYS = {
  TOTAL_TASKS: 'progress_tracker_total_tasks',
  COMPLETED_TASKS: 'progress_tracker_completed_tasks',
  REWARD: 'progress_tracker_reward',
  TASK_NAMES: 'progress_tracker_task_names',
  USE_TASK_NAMES: 'progress_tracker_use_task_names',
  USE_TIMER: 'progress_tracker_use_timer',
  TIMER_MINUTES: 'progress_tracker_timer_minutes',
  TIMER_END_AT: 'progress_tracker_timer_end_at',
  THEME: 'progress_tracker_theme',
  SOUND_ENABLED: 'progress_tracker_sound_enabled',
} as const;

// Local-only mode: no-op sync/load helpers (Firebase disabled)
const syncWithFirestore = async (_userId: string, _data: any): Promise<void> => {
  // no-op
};

const loadFromFirestore = async (_userId: string): Promise<any | null> => {
  // no-op
  return null;
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

  getTimerEndAt: (): number | null => {
    const value = localStorage.getItem(STORAGE_KEYS.TIMER_END_AT);
    return value ? Number(value) : null;
  },

  setTimerEndAt: async (endAt: number | null, userId?: string): Promise<void> => {
    if (endAt == null) {
      localStorage.removeItem(STORAGE_KEYS.TIMER_END_AT);
      if (userId) {
        await syncWithFirestore(userId, { timerEndAt: null });
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.TIMER_END_AT, String(endAt));
      if (userId) {
        await syncWithFirestore(userId, { timerEndAt: endAt });
      }
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

  clearAll: async (_userId?: string): Promise<void> => {
    localStorage.removeItem(STORAGE_KEYS.TOTAL_TASKS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_TASKS);
    localStorage.removeItem(STORAGE_KEYS.REWARD);
    localStorage.removeItem(STORAGE_KEYS.TASK_NAMES);
    localStorage.removeItem(STORAGE_KEYS.USE_TASK_NAMES);
    localStorage.removeItem(STORAGE_KEYS.USE_TIMER);
    localStorage.removeItem(STORAGE_KEYS.TIMER_MINUTES);
    localStorage.removeItem(STORAGE_KEYS.TIMER_END_AT);
  },

  loadUserData: async (_userId: string): Promise<void> => {
    // Local-only mode: nothing to load
    return;
  }
};