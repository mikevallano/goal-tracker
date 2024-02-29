module Api
  class BaseController < ActionController::API
    attr_reader :current_user

    before_action :authenticate_token!

    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from JWT::ExpiredSignature, with: :expired_token
    rescue_from JWT::DecodeError, with: :invalid_auth_token

    private

    def authenticate_token!
      payload = JsonWebToken.decode(auth_token)
      @current_user = User.find(payload['subject'])
    end

    def auth_token
      request.headers.fetch('Authorization', '').split('Bearer ').last
    end

    # Error handling

    def not_found
      render json: { error: 'Record not found' }, status: :not_found
    end

    def expired_token
      render json: { errors: ['Auth token expired'] }, status: :unauthorized
    end

    def invalid_auth_token
      render json: { errors: ['Invalid auth token'] }, status: :unauthorized
    end
  end
end
