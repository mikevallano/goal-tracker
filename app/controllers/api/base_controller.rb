module Api
  class BaseController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def not_found
      render json: { error: 'Record not found' }, status: :not_found
    end
  end
end
