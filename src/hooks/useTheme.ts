import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>(() => storage.getTheme());

  useEffect(() => {
    const updateTheme = () => {
      const root = window.document.documentElement;
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = theme === 'dark' || (theme === 'system' && systemDark);

      root.classList.toggle('dark', isDark);
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateTheme();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const changeTheme = (newTheme: 'system' | 'light' | 'dark') => {
    setTheme(newTheme);
    storage.setTheme(newTheme);
  };

  return { theme, changeTheme };
};