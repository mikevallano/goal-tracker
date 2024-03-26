import { CategoryType } from './CategoryType'

export type GoalType = {
  id: number
  name: string
  description: string
  archived_at: string
  user_id: number
  category_id: number
  created_at: string
  updated_at: string
  category: CategoryType
}

export type TrackedGoalType = {
  id: number
  goal: GoalType
  goal_id: number
  progress_rating: number | null
  notes: string | null
  start_date: string | null
  end_date: string | null
  timeframe_type: string
  created_at: string
  updated_at: string
}
