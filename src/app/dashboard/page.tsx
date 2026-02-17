import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { taskService } from '@/lib/taskService';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const userId = (session.user as any).id as string;
  if (!userId) redirect('/login');
  const tasks = await taskService.findAll(userId);

  const serializedTasks = tasks.map(task => ({
    ...task,
    dueDate: task.dueDate?.toISOString() ?? null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }));

  return <DashboardClient initialTasks={serializedTasks} userEmail={session.user?.email ?? ''} />;
}
