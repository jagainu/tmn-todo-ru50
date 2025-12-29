import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

const TASKS_KEY = 'todos'

export async function GET() {
  try {
    const tasks = await kv.get<Task[]>(TASKS_KEY) || []
    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const tasks = await kv.get<Task[]>(TASKS_KEY) || []
    
    const newTask: Task = {
      id: nanoid(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedTasks = [newTask, ...tasks]
    await kv.set(TASKS_KEY, updatedTasks)

    return NextResponse.json({ task: newTask }, { status: 201 })
  } catch (error) {
    console.error('Failed to create task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}