import { NextRequest, NextResponse } from 'next/server'
import { updateTask, deleteTask } from '@/lib/db'

interface RouteParams {
  params: {
    id: string
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params
    const updates = await request.json()
    
    // バリデーション
    const allowedFields = ['title', 'description', 'isCompleted']
    const filteredUpdates: Record<string, unknown> = {}
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        if (key === 'title' && (typeof value !== 'string' || !value.trim())) {
          return NextResponse.json(
            { error: 'タイトルは必須です' },
            { status: 400 }
          )
        }
        if (key === 'description' && typeof value !== 'string') {
          return NextResponse.json(
            { error: '説明は文字列である必要があります' },
            { status: 400 }
          )
        }
        if (key === 'isCompleted' && typeof value !== 'boolean') {
          return NextResponse.json(
            { error: '完了状態はboolean値である必要があります' },
            { status: 400 }
          )
        }
        filteredUpdates[key] = value
      }
    }
    
    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json(
        { error: '更新するフィールドが指定されていません' },
        { status: 400 }
      )
    }
    
    const updatedTask = await updateTask(id, filteredUpdates)
    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    if (error instanceof Error && error.message === 'タスクが見つかりません') {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'タスクの更新に失敗しました' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params
    await deleteTask(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'タスクの削除に失敗しました' },
      { status: 500 }
    )
  }
}