class Api::V1::GoalsController < Api::BaseController
  def index
    serialized_goals = current_user.goals.includes(:category).map do |goal|
      GoalSerializer.call!(goal:)
    end
    render json: serialized_goals, status: :ok
  end

  def create
    result = CreateGoal.call!(**goal_params.merge(user_id: current_user.id))
    if result.success?
      render json: GoalSerializer.call!(goal: result.goal), status: :ok
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  def update
    @goal = current_user.goals.find_by!(id: params[:id])
    result = UpdateGoal.call!(goal: @goal, params: goal_params)
    if result.success?
      render json: GoalSerializer.call!(goal: result.goal), status: :ok
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  private

  def goal_params
    params.permit(:name, :description, :category_id, :archived_at).to_h.symbolize_keys
  end
end
