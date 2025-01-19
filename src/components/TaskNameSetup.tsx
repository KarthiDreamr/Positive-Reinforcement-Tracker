import React from 'react';
import { ListTodo } from 'lucide-react';

interface TaskNameSetupProps {
  totalTasks: number;
  onComplete: (taskNames: string[]) => void;
  onBack: () => void;
}

export const TaskNameSetup: React.FC<TaskNameSetupProps> = ({
  totalTasks,
  onComplete,
  onBack,
}) => {
  const [taskNames, setTaskNames] = React.useState<string[]>(
    Array(totalTasks).fill('')
  );

  const handleInputChange = (index: number, value: string) => {
    const newTaskNames = [...taskNames];
    newTaskNames[index] = value;
    setTaskNames(newTaskNames);
  };

  const handleSubmit = () => {
    // If a task name is empty, use a default name
    const finalTaskNames = taskNames.map((name, index) => 
      name.trim() || `Task ${index + 1}`
    );
    onComplete(finalTaskNames);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="flex items-center justify-center mb-6">
        <ListTodo className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Name Your Tasks
      </h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {taskNames.map((name, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task {index + 1}
            </label>
            <input
              type="text"
              placeholder={`Enter task ${index + 1} name`}
              value={name}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
        >
          Start Tracking
        </button>
        <button
          onClick={onBack}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
};