class TrackedGoalsSerializer < BaseSerializer
  def initialize(user:, timeframe:)
    @user = user
    @timeframe = timeframe
  end

  def call!
    tracked_goals_query
    serialized_result
  end

  private

  def validate_params!
    # TODO: Decide how to handle
  end

  def tracked_goals_query
    @tracked_goals =
      TrackedGoal
      .by_user(@user)
      .includes(:goal)
    @tracked_goals = @tracked_goals.by_week(query_start_date) if @timeframe.present?
  end

  def serialized_result
    @tracked_goals.map do |tracked_goal|
      tracked_goal.attributes.merge('goal' => tracked_goal.goal.name)
    end
  end

  def query_start_date
    # TODO: probably want to validate the values
    @timeframe.in?(timeframe_map.keys) ? timeframe_map[@timeframe] : timeframe_map[timeframe_map.keys.first]
  end

  def timeframe_map
    start_day_sym = @user.week_starts_on_day_sym
    {
      'this-week' => Date.current.beginning_of_week(start_day_sym),
      'last-week' => 1.week.ago.beginning_of_week(start_day_sym),
      'next-week' => 1.week.from_now.beginning_of_week(start_day_sym)
    }
  end
end
