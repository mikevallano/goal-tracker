class Api::V1::TrackedGoalsController < Api::BaseController
  def index
    tracked_goals = TrackedGoalsSerializer.call!(
      user: current_user,
      timeframe: params[:timeframe] # TODO: decide how to handle
    )
    render json: tracked_goals, status: :ok
  end

  def create
    result = CreateTrackedGoal.call!(**tracked_goal_params)
    if result.success?
      render json: result.tracked_goal, status: :ok
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  private

  def tracked_goal_params
    params.permit(:goal_id, :timeframe_type).to_h.symbolize_keys
  end
end
