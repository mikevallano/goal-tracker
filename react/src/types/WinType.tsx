import { CategoryType } from './CategoryType'

export type WinType = {
  id: number
  title: string
  description: string | null
  user_id: string
  category_id: string
  happened_at: string
  category: CategoryType
}
