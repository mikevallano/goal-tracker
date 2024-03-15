class CreateTrackedGoal < BaseService
  def initialize(goal_id:, timeframe_type:, timeframe: 'this-week')
    @goal_id = goal_id
    @timeframe_type = timeframe_type
    @timeframe = timeframe
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
    @goal = Goal.find_by(id: @goal_id)
    raise 'Goal must be provided' unless @goal
  end

  def create_tracked_goal!
    @tracked_goal =
      TrackedGoal.create!(
        goal_id: @goal_id,
        timeframe_type: @timeframe_type,
        start_date: start_date.beginning_of_day
      )
  end

  def start_date
    case @timeframe_type
    when 'year'
      Date.current.beginning_of_year
    when 'quarter'
      Date.current.beginning_of_quarter
    when 'week'
      if @timeframe == 'this-week'
        Date.current.beginning_of_week(@goal.user.week_starts_on_day_sym)
      elsif @timeframe == 'next-week'
        1.week.from_now.beginning_of_week(@goal.user.week_starts_on_day_sym)
      end
    else
      raise 'invalid timeframe type'
    end
  end
end
