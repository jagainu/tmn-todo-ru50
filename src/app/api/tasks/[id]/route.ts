import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { Task } from '../route'

const TASKS_KEY = 'todos'

interface RouteParams {
  params: {
    id: string
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, completed } = body

    const tasks = await kv.get<Task[]>(TASKS_KEY) || []
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    const existingTask = tasks[taskIndex]
    const updatedTask: Task = {
      ...existingTask,
      ...(title !== undefined && { title: title.trim() }),
      ...(completed !== undefined && { completed: Boolean(completed) }),
      updatedAt: new Date().toISOString(),
    }

    // タイトルが空文字列でないことを確認
    if (updatedTask.title.length === 0) {
      return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 })
    }

    tasks[taskIndex] = updatedTask
    await kv.set(TASKS_KEY, tasks)

    return NextResponse.json({ task: updatedTask })
  } catch (error) {
    console.error('Failed to update task:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    const tasks = await kv.get<Task[]>(TASKS_KEY) || []
    const filteredTasks = tasks.filter(task => task.id !== id)

    if (filteredTasks.length === tasks.length) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    await kv.set(TASKS_KEY, filteredTasks)

    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Failed to delete task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}