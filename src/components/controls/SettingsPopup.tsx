import React from 'react';
import { Volume2, VolumeX, Monitor, Sun, Moon } from 'lucide-react';

interface SettingsPopupProps {
  soundEnabled: boolean;
  onSoundToggle: () => void;
  theme: 'system' | 'light' | 'dark';
  onThemeChange: (theme: 'system' | 'light' | 'dark') => void;
  onClose: () => void;
}

export const SettingsPopup: React.FC<SettingsPopupProps> = ({
  soundEnabled,
  onSoundToggle,
  theme,
  onThemeChange,
  onClose,
}) => {
  return (
    <div className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
        
        <div className="space-y-4">
          <button
            onClick={onSoundToggle}
            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50"
          >
            <span className="text-gray-700 dark:text-slate-300">Sound</span>
            <span className="text-indigo-600 dark:text-emerald-400">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </span>
          </button>

          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-slate-300">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onThemeChange('system')}
                className={`flex flex-col items-center p-2 rounded-md ${
                  theme === 'system'
                    ? 'bg-indigo-100 dark:bg-emerald-900/50'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <Monitor className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                <span className="text-xs mt-1 text-gray-700 dark:text-slate-300">System</span>
              </button>
              <button
                onClick={() => onThemeChange('light')}
                className={`flex flex-col items-center p-2 rounded-md ${
                  theme === 'light'
                    ? 'bg-indigo-100 dark:bg-emerald-900/50'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <Sun className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                <span className="text-xs mt-1 text-gray-700 dark:text-slate-300">Light</span>
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={`flex flex-col items-center p-2 rounded-md ${
                  theme === 'dark'
                    ? 'bg-indigo-100 dark:bg-emerald-900/50'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <Moon className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                <span className="text-xs mt-1 text-gray-700 dark:text-slate-300">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};