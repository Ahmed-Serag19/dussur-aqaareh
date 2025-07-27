export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  content: T[]
  number: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface BaseEntity {
  id: number
  createdAt?: string
  updatedAt?: string
}

export type Language = "ar" | "en"

export interface SelectOption {
  value: string | number
  label: string
}
