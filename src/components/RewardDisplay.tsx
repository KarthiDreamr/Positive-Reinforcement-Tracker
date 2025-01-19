import React from 'react';
import { Gift } from 'lucide-react';

interface RewardDisplayProps {
  reward: string;
  isComplete: boolean;
}

export const RewardDisplay: React.FC<RewardDisplayProps> = ({ reward, isComplete }) => {
  if (!reward) return null;

  return (
    <div className="mt-4 p-4 bg-indigo-50 rounded-lg flex items-center justify-center gap-2">
      <Gift className={`w-5 h-5 ${isComplete ? 'text-green-500' : 'text-indigo-500'}`} />
      <p className={`font-medium ${isComplete ? 'text-green-600' : 'text-indigo-600'}`}>
        {isComplete ? 'Reward Unlocked: ' : 'Reward: '}
        {reward}
      </p>
    </div>
  );
};