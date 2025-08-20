import React from 'react';
import { ResetButton } from './controls/ResetButton';
import { SettingsButton } from './controls/SettingsButton';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User as UserIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onReset: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  showReset?: boolean;
  showSettings?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onReset,
  soundEnabled,
  onSoundToggle,
  showReset = true,
  showSettings = true,
}) => {
  const { theme, changeTheme } = useTheme();
  const { user, signOutUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-purple-950 dark:via-fuchsia-950 dark:to-rose-950 p-4">
      {showReset && (
        <div className="fixed top-8 left-8">
          <ResetButton onReset={onReset} />
        </div>
      )}
      <div className="fixed top-8 right-8 flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
              <UserIcon className="w-4 h-4 text-indigo-600 dark:text-emerald-400" />
              <span className="text-sm text-gray-700 dark:text-slate-300">{user.displayName || user.email}</span>
            </div>
            <button
              onClick={signOutUser}
              className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-colors"
              title="Sign out"
            >
              <LogOut className="w-5 h-5 text-indigo-600 dark:text-emerald-400" />
            </button>
          </div>
        )}
        {showSettings && (
          <SettingsButton
            soundEnabled={soundEnabled}
            onSoundToggle={onSoundToggle}
            theme={theme}
            onThemeChange={changeTheme}
          />
        )}
      </div>
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
};