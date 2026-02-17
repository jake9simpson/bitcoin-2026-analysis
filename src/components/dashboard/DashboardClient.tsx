'use client';

import { useState, useCallback } from 'react';
import type { TaskFormData, TaskFilterOptions } from '@/types';
import Header from '@/components/layout/Header';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import TaskFilters from '@/components/tasks/TaskFilters';

interface SerializedTask {
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

interface DashboardClientProps {
  initialTasks: SerializedTask[];
  userEmail: string;
}

export default function DashboardClient({ initialTasks, userEmail }: DashboardClientProps) {
  const [tasks, setTasks] = useState<SerializedTask[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilterOptions>({});
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<SerializedTask | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async (activeFilters?: TaskFilterOptions) => {
    const f = activeFilters ?? filters;
    const params = new URLSearchParams();
    if (f.status) params.set('status', f.status);
    if (f.priority) params.set('priority', f.priority);

    try {
      const res = await fetch(`/api/tasks?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, [filters]);

  const handleSubmit = useCallback(async (data: TaskFormData) => {
    setLoading(true);
    try {
      if (editingTask) {
        const res = await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update task');
      } else {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create task');
      }
      setShowForm(false);
      setEditingTask(null);
      await fetchTasks();
    } catch (err) {
      console.error('Error saving task:', err);
      alert('Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [editingTask, fetchTasks]);

  const handleToggle = useCallback(async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: task.status === 'completed' ? 'pending' : 'completed',
        }),
      });
      if (!res.ok) throw new Error('Failed to toggle task');
      await fetchTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
      alert('Failed to update task status.');
    }
  }, [tasks, fetchTasks]);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task.');
    }
  }, [fetchTasks]);

  const handleFilterChange = useCallback((newFilters: TaskFilterOptions) => {
    setFilters(newFilters);
    fetchTasks(newFilters);
  }, [fetchTasks]);

  const handleEdit = useCallback((task: SerializedTask) => {
    setEditingTask(task);
    setShowForm(true);
  }, []);

  const openCreateForm = useCallback(() => {
    setEditingTask(null);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingTask(null);
  }, []);

  return (
    <>
      <Header userEmail={userEmail} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <button
            onClick={openCreateForm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Task
          </button>
        </div>
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
        <div className="mt-6">
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        {showForm && (
          <TaskForm
            initialData={editingTask ? {
              title: editingTask.title,
              description: editingTask.description ?? undefined,
              dueDate: editingTask.dueDate ?? undefined,
              priority: editingTask.priority as TaskFormData['priority'],
              id: editingTask.id,
            } : undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}
      </main>
    </>
  );
}
