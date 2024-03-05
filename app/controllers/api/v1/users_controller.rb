class Api::V1::UsersController < Api::BaseController
  skip_before_action :authenticate_token!, on: :create

  def create
    result = ::CreateUser.call!(email: user_params[:email], password: user_params[:password])
    if result.success?
      render json: result.user, status: :created
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
