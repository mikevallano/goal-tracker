class UpdateGoal < BaseService
  def initialize(goal:, params:)
    @goal = goal
    @params = params
  end

  def call!
    validate_params!
    update_goal!
    success(goal: @goal)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    raise 'Goal is required' unless @goal.present?
  end

  def update_goal!
    @goal.update!(@params)
  end
end
