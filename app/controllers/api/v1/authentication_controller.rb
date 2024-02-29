class Api::V1::AuthenticationController < Api::BaseController
  skip_before_action :authenticate_token!

  def create
    user = User.find_by!(email: params[:email])
    if user.valid_password?(params[:password])
      render json: { auth_token: JsonWebToken.encode({ 'subject' => user.id }) }, status: :ok
    else
      render json: { errors: ['Invalid password'] }, status: :unauthorized
    end
  end
end
