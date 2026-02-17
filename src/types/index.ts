export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'completed';

export interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: Date | string;
  priority: TaskPriority;
}

export interface TaskFilterOptions {
  status?: TaskStatus;
  priority?: TaskPriority;
}
