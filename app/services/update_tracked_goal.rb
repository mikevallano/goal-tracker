class UpdateTrackedGoal < BaseService
  def initialize(user_id:, tracked_goal_id:, notes: nil, progress_rating: nil)
    @user_id = user_id
    @tracked_goal_id = tracked_goal_id
    @notes = notes
    @progress_rating = progress_rating
  end

  def call!
    validate_params!
    update_tracked_goal!
    success(tracked_goal: @tracked_goal)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    @user = User.find_by(id: @user_id)
    raise 'Valid user_id is required' unless @user
    @tracked_goal = @user.tracked_goals.find_by(id: @tracked_goal_id)
    raise 'Valid tracked_goal_id is required' unless @tracked_goal
  end

  def update_tracked_goal!
    @tracked_goal.update!(notes: @notes, progress_rating: valid_progress_rating)
  end

  def updated_notes
    @notes || @tracked_goal.notes
  end

  def valid_progress_rating
    return @tracked_goal.progress_rating if @progress_rating.blank?
    @progress_rating.to_i
  end
end
