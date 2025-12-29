import { Suspense } from 'react'
import { TodoList } from '@/components/todo-list'
import { AddTodoForm } from '@/components/add-todo-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckSquare } from 'lucide-react'
import { TodoListSkeleton } from '@/components/todo-list-skeleton'

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <CheckSquare className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
        </div>
        <p className="text-gray-600">シンプルで使いやすいタスク管理アプリ</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">新しいタスクを追加</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTodoForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">タスクリスト</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TodoListSkeleton />}>
            <TodoList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}