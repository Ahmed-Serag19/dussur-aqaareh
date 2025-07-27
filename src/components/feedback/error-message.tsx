"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorMessage({ message, onRetry, showRetry = false }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          إعادة المحاولة
        </Button>
      )}
    </div>
  )
}
