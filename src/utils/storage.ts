const STORAGE_KEYS = {
  TOTAL_TASKS: 'progress_tracker_total_tasks',
  COMPLETED_TASKS: 'progress_tracker_completed_tasks',
  REWARD: 'progress_tracker_reward',
  TASK_NAMES: 'progress_tracker_task_names',
  USE_TASK_NAMES: 'progress_tracker_use_task_names',
  USE_TIMER: 'progress_tracker_use_timer',
  TIMER_MINUTES: 'progress_tracker_timer_minutes',
} as const;

export const storage = {
  getTotalTasks: (): number | null => {
    const value = localStorage.getItem(STORAGE_KEYS.TOTAL_TASKS);
    return value ? Number(value) : null;
  },

  setTotalTasks: (tasks: number | null): void => {
    if (tasks === null) {
      localStorage.removeItem(STORAGE_KEYS.TOTAL_TASKS);
    } else {
      localStorage.setItem(STORAGE_KEYS.TOTAL_TASKS, String(tasks));
    }
  },

  getCompletedTasks: (): number => {
    return Number(localStorage.getItem(STORAGE_KEYS.COMPLETED_TASKS) || 0);
  },

  setCompletedTasks: (tasks: number): void => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, String(tasks));
  },

  getReward: (): string => {
    return localStorage.getItem(STORAGE_KEYS.REWARD) || '';
  },

  setReward: (reward: string): void => {
    if (!reward) {
      localStorage.removeItem(STORAGE_KEYS.REWARD);
    } else {
      localStorage.setItem(STORAGE_KEYS.REWARD, reward);
    }
  },

  getTaskNames: (): string[] => {
    const names = localStorage.getItem(STORAGE_KEYS.TASK_NAMES);
    return names ? JSON.parse(names) : [];
  },

  setTaskNames: (names: string[]): void => {
    localStorage.setItem(STORAGE_KEYS.TASK_NAMES, JSON.stringify(names));
  },

  getUseTaskNames: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.USE_TASK_NAMES) === 'true';
  },

  setUseTaskNames: (useTaskNames: boolean): void => {
    localStorage.setItem(STORAGE_KEYS.USE_TASK_NAMES, String(useTaskNames));
  },

  getUseTimer: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.USE_TIMER) === 'true';
  },

  setUseTimer: (useTimer: boolean): void => {
    localStorage.setItem(STORAGE_KEYS.USE_TIMER, String(useTimer));
  },

  getTimerMinutes: (): number => {
    return Number(localStorage.getItem(STORAGE_KEYS.TIMER_MINUTES) || 30);
  },

  setTimerMinutes: (minutes: number): void => {
    localStorage.setItem(STORAGE_KEYS.TIMER_MINUTES, String(minutes));
  },

  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOTAL_TASKS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_TASKS);
    localStorage.removeItem(STORAGE_KEYS.REWARD);
    localStorage.removeItem(STORAGE_KEYS.TASK_NAMES);
    localStorage.removeItem(STORAGE_KEYS.USE_TASK_NAMES);
    localStorage.removeItem(STORAGE_KEYS.USE_TIMER);
    localStorage.removeItem(STORAGE_KEYS.TIMER_MINUTES);
  },
};