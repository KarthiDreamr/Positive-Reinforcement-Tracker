import React from 'react';

interface CircularProgressProps {
  percentage: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="stroke-gray-200"
          strokeWidth="8"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className="stroke-indigo-600 transition-all duration-700 ease-out"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-indigo-600">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};