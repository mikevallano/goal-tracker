class Api::V1::WinsController < Api::BaseController
  def index
    serialized_wins = current_user.wins.includes(:category).map do |win|
      WinSerializer.call!(win:)
    end
    render json: serialized_wins, status: :ok
  end
end
