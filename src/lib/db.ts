import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid'
import { Task } from '@/types/task'

const TASKS_KEY = 'tasks'

export async function getTasks(): Promise<Task[]> {
  try {
    const tasks = await kv.get<Task[]>(TASKS_KEY)
    return tasks || []
  } catch (error) {
    console.error('Failed to get tasks:', error)
    return []
  }
}

export async function createTask(title: string, description: string): Promise<Task> {
  const task: Task = {
    id: nanoid(),
    title,
    description,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  }

  try {
    const tasks = await getTasks()
    const updatedTasks = [...tasks, task]
    await kv.set(TASKS_KEY, updatedTasks)
    return task
  } catch (error) {
    console.error('Failed to create task:', error)
    throw new Error('タスクの作成に失敗しました')
  }
}

export async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> {
  try {
    const tasks = await getTasks()
    const taskIndex = tasks.findIndex(task => task.id === id)
    
    if (taskIndex === -1) {
      throw new Error('タスクが見つかりません')
    }

    const updatedTask = { ...tasks[taskIndex], ...updates }
    tasks[taskIndex] = updatedTask
    
    await kv.set(TASKS_KEY, tasks)
    return updatedTask
  } catch (error) {
    console.error('Failed to update task:', error)
    throw new Error('タスクの更新に失敗しました')
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const tasks = await getTasks()
    const filteredTasks = tasks.filter(task => task.id !== id)
    await kv.set(TASKS_KEY, filteredTasks)
  } catch (error) {
    console.error('Failed to delete task:', error)
    throw new Error('タスクの削除に失敗しました')
  }
}