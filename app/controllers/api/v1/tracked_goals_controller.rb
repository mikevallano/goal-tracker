class Api::V1::TrackedGoalsController < Api::BaseController
  def index
    filter_res = TrackedGoalsFilter.call!(user: current_user, filter: params[:timeframe])
    if filter_res.success?
      serialized_tracked_goals = TrackedGoalsSerializer.call!(
        tracked_goals: filter_res.tracked_goals
      )
      render json: serialized_tracked_goals, status: :ok
    else
      render json: { error: filter_res.error_message }, status: :precondition_failed
    end
  end

  def create
    result = CreateTrackedGoal.call!(**create_params)
    if result.success?
      tracked_goal = TrackedGoalSerializer.call!(tracked_goal: result.tracked_goal)
      render json: tracked_goal, status: :ok
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  def update
    result = UpdateTrackedGoal.call!(**update_params)
    if result.success?
      tracked_goal = TrackedGoalSerializer.call!(tracked_goal: result.tracked_goal)
      render json: tracked_goal, status: :ok
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  private

  def tracked_goal_params
    params.permit(:goal_id, :timeframe, :timeframe_type, :progress_rating, :notes).to_h.symbolize_keys
  end

  def create_params
    # TODO: add current_user id and validate in service
    tracked_goal_params.slice(:goal_id, :timeframe, :timeframe_type)
  end

  def update_params
    tracked_goal_params
      .slice(:notes, :progress_rating)
      .merge(tracked_goal_id: params[:id], user_id: current_user.id)
  end
end
