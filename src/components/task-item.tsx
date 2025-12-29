'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Task } from '@/types/task'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Edit2, Trash2, Save, X } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: !isCompleted,
        }),
      })

      if (!response.ok) {
        throw new Error('タスクの更新に失敗しました')
      }

      setIsCompleted(!isCompleted)
      router.refresh()
    } catch (error) {
      console.error('Error updating task:', error)
      alert('タスクの更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert('タイトルを入力してください')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('タスクの更新に失敗しました')
      }

      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Error updating task:', error)
      alert('タスクの更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('タスクの削除に失敗しました')
      }

      setDeleteDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('タスクの削除に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={`transition-opacity ${isCompleted ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleToggleComplete}
            disabled={isLoading}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="edit-title" className="sr-only">
                    タイトル
                  </Label>
                  <Input
                    id="edit-title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    disabled={isLoading}
                    placeholder="タスクタイトル"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description" className="sr-only">
                    説明
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    disabled={isLoading}
                    placeholder="タスクの説明"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    キャンセル
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  作成日: {formatDate(task.createdAt)}
                </p>
              </>
            )}
          </div>
          
          {!isEditing && (
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={isLoading}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>タスクを削除しますか？</DialogTitle>
                    <DialogDescription>
                      この操作は取り消せません。タスク「{task.title}」を完全に削除します。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(false)}
                      disabled={isLoading}
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isLoading}
                    >
                      削除
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}