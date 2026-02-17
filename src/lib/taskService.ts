import { prisma } from './prisma';
import { TaskFilterOptions, TaskFormData } from '@/types';

export const taskService = {
  async findAll(userId: string, filters?: TaskFilterOptions) {
    return prisma.task.findMany({
      where: {
        userId,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.priority && { priority: filters.priority }),
      },
      orderBy: [
        { status: 'asc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  },

  async create(userId: string, data: TaskFormData) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        dueDate: data.dueDate ? new Date(data.dueDate as string) : null,
        priority: data.priority,
        userId,
      },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  },

  async update(id: string, userId: string, data: Partial<TaskFormData> & { status?: string }) {
    const result = await prisma.task.updateMany({
      where: { id, userId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate as string) : null }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
    if (result.count === 0) return null;
    return prisma.task.findFirst({ where: { id, userId } });
  },

  async delete(id: string, userId: string) {
    const result = await prisma.task.deleteMany({ where: { id, userId } });
    if (result.count === 0) return null;
    return { id };
  },
};
