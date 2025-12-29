import { Suspense } from 'react'
import { TaskList } from '@/components/task-list'
import { AddTaskForm } from '@/components/add-task-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-4 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>新しいタスクを追加</CardTitle>
          <CardDescription>
            タイトルと説明を入力してタスクを作成してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddTaskForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>タスクリスト</CardTitle>
          <CardDescription>
            すべてのタスクがここに表示されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}