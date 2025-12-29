import { getTasks } from '@/lib/db'
import { TaskItem } from './task-item'

export async function TaskList() {
  const tasks = await getTasks()

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">まだタスクがありません</p>
        <p className="text-sm">上のフォームから新しいタスクを追加してみましょう</p>
      </div>
    )
  }

  // 作成日時の新しい順でソート
  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}