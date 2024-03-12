class CreateTrackedGoal < BaseService
  def initialize(goal_id:, timeframe_type:)
    @goal_id = goal_id
    @timeframe_type = timeframe_type
  end

  def call!
    validate_params!
    create_tracked_goal!
    success(tracked_goal: @tracked_goal)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    goal = Goal.find_by(id: @goal_id)
    raise 'Goal must be provided' unless goal
  end

  def create_tracked_goal!
    @tracked_goal = TrackedGoal.create!(goal_id: @goal_id, timeframe_type: @timeframe_type)
  end
end
