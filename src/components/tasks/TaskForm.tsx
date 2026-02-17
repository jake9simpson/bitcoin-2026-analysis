'use client';

import { useState } from 'react';
import type { TaskFormData } from '@/types';

interface TaskFormProps {
  initialData?: TaskFormData & { id?: string };
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export default function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [dueDate, setDueDate] = useState(() => {
    if (!initialData?.dueDate) return '';
    if (typeof initialData.dueDate === 'string') {
      return initialData.dueDate.slice(0, 10);
    }
    return initialData.dueDate.toISOString().slice(0, 10);
  });
  const [priority, setPriority] = useState(initialData?.priority ?? 'medium');
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = !!initialData?.id;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      priority,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {isEditMode ? 'Edit Task' : 'Create Task'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="priority" className="mb-1 block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskFormData['priority'])}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? 'Saving...'
                : isEditMode
                  ? 'Update Task'
                  : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
