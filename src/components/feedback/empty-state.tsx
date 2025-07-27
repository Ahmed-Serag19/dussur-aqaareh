import type React from "react"
import { Home, Search } from "lucide-react"

interface EmptyStateProps {
  message: string
  icon?: "home" | "search"
  action?: React.ReactNode
}

export function EmptyState({ message, icon = "home", action }: EmptyStateProps) {
  const Icon = icon === "home" ? Home : Search

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      {action}
    </div>
  )
}
