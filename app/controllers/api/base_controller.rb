module Api
  class BaseController < ActionController::API
    # include ActionController::MimeResponds
    # respond_to :json
    attr_reader :current_user

    before_action :authenticate_token!

    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    private

    def not_found
      render json: { error: 'Record not found' }, status: :not_found
    end

    def authenticate_token!
      payload = JsonWebToken.decode(auth_token)
      @current_user = User.find(payload['sub'])
    rescue JWT::ExpiredSignature
      render json: { errors: ['Auth token expired'] }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { errors: ['Invalid auth token'] }, status: :unauthorized
    end

    def auth_token
      @auth_token ||= request.headers.fetch('Authorization', '').split(' ').last
    end
  end
end
