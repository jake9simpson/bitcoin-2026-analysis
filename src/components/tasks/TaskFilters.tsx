'use client';

import type { TaskFilterOptions, TaskPriority, TaskStatus } from '@/types';

interface TaskFiltersProps {
  filters: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}

const statusOptions: { label: string; value: TaskStatus | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

const priorityOptions: { label: string; value: TaskPriority | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
];

export default function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div>
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
          Status
        </span>
        <div className="flex gap-1">
          {statusOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onFilterChange({ ...filters, status: opt.value })}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                filters.status === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
          Priority
        </span>
        <div className="flex flex-wrap gap-1">
          {priorityOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onFilterChange({ ...filters, priority: opt.value })}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                filters.priority === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
