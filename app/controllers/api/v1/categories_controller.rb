class Api::V1::CategoriesController < Api::BaseController
  def index
    serialized_categories = current_user.categories.map do |category|
      CategorySerializer.call!(category:)
    end
    render json: serialized_categories, stauts: :ok
  end

  def create
    result = CreateCategory.call!(user_id: current_user.id, name: params[:name])
    if result.success?
      render json: CategorySerializer.call!(category: result.category), status: :created
    else
      render json: { error: result.error_message }, status: :precondition_failed
    end
  end
end
