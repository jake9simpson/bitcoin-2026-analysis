import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { taskService } from '@/lib/taskService';

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
});

const validStatuses = ['pending', 'completed'] as const;
const validPriorities = ['low', 'medium', 'high', 'urgent'] as const;

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  if (!userId) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');
  const priorityParam = searchParams.get('priority');

  const status = statusParam && (validStatuses as readonly string[]).includes(statusParam)
    ? (statusParam as typeof validStatuses[number])
    : undefined;
  const priority = priorityParam && (validPriorities as readonly string[]).includes(priorityParam)
    ? (priorityParam as typeof validPriorities[number])
    : undefined;

  const tasks = await taskService.findAll(userId, { status, priority });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id as string;
  if (!userId) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = createTaskSchema.parse(body);
    const task = await taskService.create(userId, data);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
