import { NextRequest, NextResponse } from 'next/server'
import { createTask, getTasks } from '@/lib/db'

export async function GET() {
  try {
    const tasks = await getTasks()
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error getting tasks:', error)
    return NextResponse.json(
      { error: 'タスクの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()
    
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { error: 'タイトルは必須です' },
        { status: 400 }
      )
    }

    const task = await createTask(
      title.trim(),
      typeof description === 'string' ? description.trim() : ''
    )
    
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'タスクの作成に失敗しました' },
      { status: 500 }
    )
  }
}