import React from 'react';
import { Settings } from 'lucide-react';
import { SettingsPopup } from './SettingsPopup';

interface SettingsButtonProps {
  soundEnabled: boolean;
  onSoundToggle: () => void;
  theme: 'system' | 'light' | 'dark';
  onThemeChange: (theme: 'system' | 'light' | 'dark') => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  soundEnabled,
  onSoundToggle,
  theme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-colors"
        title="Settings"
      >
        <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[998]"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-[999]">
            <SettingsPopup
              soundEnabled={soundEnabled}
              onSoundToggle={onSoundToggle}
              theme={theme}
              onThemeChange={onThemeChange}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};