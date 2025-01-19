import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    className="p-2 hover:bg-white/50 rounded-full transition-colors"
    title="Reset progress"
  >
    <RotateCcw className="w-6 h-6 text-indigo-600" />
  </button>
);