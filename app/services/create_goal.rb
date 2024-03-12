class CreateGoal < BaseService
  def initialize(name:, user_id:, category_id:, description: nil)
    @name = name
    @user_id = user_id
    @category_id = category_id
    @description = description
  end

  def call!
    validate_params!
    create_goal!
    success(goal: @goal)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    raise 'Name is required' unless @name.present?
    user = User.find_by!(id: @user_id)
    raise 'Valid user is required' unless user
    category = Category.find_by!(id: @category_id)
    raise 'Valid category is required' unless category
  end

  def create_goal!
    @goal = Goal.create!(user_id: @user_id, category_id: @category_id, name: @name, description: @description)
  end
end
