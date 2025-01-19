import React from 'react';
import { SoundToggle } from './controls/SoundToggle';
import { ResetButton } from './controls/ResetButton';

interface LayoutProps {
  children: React.ReactNode;
  onReset: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onReset,
  soundEnabled,
  onSoundToggle,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="fixed top-8 left-8">
        <ResetButton onReset={onReset} />
      </div>
      <div className="fixed top-8 right-8">
        <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
};