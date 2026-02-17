'use client';

import PriorityBadge from './PriorityBadge';

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function isOverdue(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr);
  due.setHours(0, 0, 0, 0);
  return due < today;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const completed = task.status === 'completed';
  const overdue = task.dueDate && !completed && isOverdue(task.dueDate);

  return (
    <div className="flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`font-medium ${
              completed ? 'text-gray-400 line-through' : 'text-gray-900'
            }`}
          >
            {task.title}
          </span>
          <PriorityBadge priority={task.priority} />
        </div>

        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {task.description}
          </p>
        )}

        {task.dueDate && (
          <p
            className={`mt-1 text-sm ${
              overdue ? 'font-medium text-red-600' : 'text-gray-500'
            }`}
          >
            Due: {formatDate(task.dueDate)}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
