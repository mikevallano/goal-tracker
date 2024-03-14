export type GoalType = {
  id: number
  name: string
  description: string
  archived_at: string
  user_id: number
  category_id: number
  created_at: string
  updated_at: string
}

export type TrackedGoalType = {
  id: number
  goal: string
  goal_id: number
  progress_rating: number | null
  start_date: string | null
  end_date: string | null
  timeframe_type: string
  created_at: string
  updated_at: string
}
