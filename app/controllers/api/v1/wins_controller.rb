class Api::V1::WinsController < Api::BaseController
  def index
    serialized_wins = current_user.wins.includes(:category).order(happened_at: :desc, created_at: :desc).map do |win|
      WinSerializer.call!(win:)
    end
    render json: serialized_wins, status: :ok
  end

  def create
    result = CreateWin.call!(params: create_params)
    if result.success?
      render json: result.win
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  private

  def win_params
    params.permit(:title, :description, :category_id, :happened_at).to_h.symbolize_keys
  end

  def create_params
    win_params.merge(user_id: current_user.id)
  end
end
