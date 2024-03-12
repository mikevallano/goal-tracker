class CreateCategory < BaseService
  def initialize(user_id:, name:)
    @user_id = user_id
    @name = name
  end

  def call!
    validate_params!
    create_category!
    success(category: @category)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    user = User.find_by!(id: @user_id)
    raise 'Valid user_id is required' unless user.is_a?(User)
    raise 'Name is required' unless @name.present?
  end

  def create_category!
    @category = Category.create!(user_id: @user_id, name: @name)
  end
end
