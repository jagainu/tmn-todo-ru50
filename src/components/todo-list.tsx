import { Task } from '@/app/api/tasks/route'
import { TodoItem } from './todo-item'

async function getTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/tasks`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    
    const data = await response.json()
    return data.tasks || []
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return []
  }
}

export async function TodoList() {
  const tasks = await getTasks()

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>まだタスクがありません。</p>
        <p className="text-sm">上のフォームから新しいタスクを追加しましょう。</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  )
}