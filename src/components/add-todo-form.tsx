"use client"

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddTodoForm() {
  const [title, setTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!title.trim()) return

    startTransition(async () => {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: title.trim() }),
        })

        if (!response.ok) {
          throw new Error('Failed to create task')
        }

        setTitle('')
        router.refresh()
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder="新しいタスクを入力してください"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPending}
        className="flex-1"
        maxLength={200}
      />
      <Button type="submit" disabled={isPending || !title.trim()} size="default">
        <Plus className="h-4 w-4 mr-1" />
        追加
      </Button>
    </form>
  )
}