class TrackedGoalSerializer < BaseSerializer
  def initialize(tracked_goal:)
    @tracked_goal = tracked_goal
  end

  def call!
    serialized_result
  end

  private

  # rubocop:disable Metrics/MethodLength
  def serialized_result
    {
      id: @tracked_goal.id,
      timeframe_type: @tracked_goal.timeframe_type,
      progress_rating: @tracked_goal.progress_rating,
      goal_id: @tracked_goal.goal_id,
      start_date: @tracked_goal.start_date,
      end_date: @tracked_goal.end_date,
      created_at: @tracked_goal.created_at,
      updated_at: @tracked_goal.updated_at,
      notes: @tracked_goal.notes,
      goal_name: @tracked_goal.goal.name
    }
  end
  # rubocop:enable Metrics/MethodLength
end
