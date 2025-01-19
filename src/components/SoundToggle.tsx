import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className="absolute right-12 top-12 p-2 hover:bg-gray-100 rounded-full transition-colors"
    title={enabled ? 'Disable sound' : 'Enable sound'}
  >
    {enabled ? (
      <Volume2 className="w-6 h-6 text-indigo-600" />
    ) : (
      <VolumeX className="w-6 h-6 text-gray-400" />
    )}
  </button>
);