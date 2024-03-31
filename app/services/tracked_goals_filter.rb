class TrackedGoalsFilter < BaseService
  def initialize(user:, filter:)
    @user = user
    @filter = filter
  end

  def call!
    validate_params!
    query_tracked_goals
    success(tracked_goals: @tracked_goals)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    raise 'User must be provided' unless @user.is_a?(User)
    raise "Filter is invalid. Must be in #{timeframe_map.keys.join(', ')}" unless valid_filter?
  end

  def query_tracked_goals
    @tracked_goals =
      TrackedGoal
      .by_user(@user)
    @tracked_goals = @tracked_goals.by_start_date(query_start_date) if @filter.present?
  end

  def query_start_date
    @filter.in?(timeframe_map.keys) ? timeframe_map[@filter] : timeframe_map[timeframe_map.keys.first]
  end

  def timeframe_map
    start_day_sym = @user.week_starts_on_day_sym
    {
      'this-week' => Date.current.beginning_of_week(start_day_sym),
      'last-week' => 1.week.ago.beginning_of_week(start_day_sym),
      'next-week' => 1.week.from_now.beginning_of_week(start_day_sym)
    }
  end

  def valid_filter?
    return true if @filter.blank?
    @filter.in?(timeframe_map.keys)
  end
end
