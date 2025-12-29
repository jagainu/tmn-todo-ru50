export function TodoListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200"
        >
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}