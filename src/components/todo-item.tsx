"use client"

import { useState, useTransition } from 'react'
import { Task } from '@/app/api/tasks/route'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit2, MoreVertical, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TodoItemProps {
  task: Task
}

export function TodoItem({ task }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleToggleComplete = async () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !task.completed }),
        })

        if (!response.ok) {
          throw new Error('Failed to update task')
        }

        router.refresh()
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    })
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditTitle(task.title)
  }

  const handleSave = async () => {
    if (!editTitle.trim()) {
      setEditTitle(task.title)
      setIsEditing(false)
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: editTitle.trim() }),
        })

        if (!response.ok) {
          throw new Error('Failed to update task')
        }

        setIsEditing(false)
        router.refresh()
      } catch (error) {
        console.error('Failed to update task:', error)
        setEditTitle(task.title)
      }
    })
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete task')
        }

        router.refresh()
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleToggleComplete}
        disabled={isPending}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              autoFocus
              disabled={isPending}
              maxLength={200}
              className="text-sm"
            />
          </div>
        ) : (
          <span
            className={cn(
              "text-sm text-gray-900 break-words",
              task.completed && "line-through text-gray-500"
            )}
          >
            {task.title}
          </span>
        )}
      </div>

      {!isEditing && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              disabled={isPending}
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">タスクメニューを開く</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleEdit} className="text-sm">
              <Edit2 className="mr-2 h-4 w-4" />
              編集
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-sm text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              削除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}