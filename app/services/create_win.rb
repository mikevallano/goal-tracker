class CreateWin < BaseService
  def initialize(params:)
    @user_id = params[:user_id]
    @category_id = params[:category_id]
    @title = params[:title]
    @description = params[:description]
    @happened_at = params[:happened_at]
  end

  def call!
    validate_params!
    create_win!
    success(win: @win)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    raise 'Title must be provided' unless @title.present?
    user = User.find_by(id: @user_id)
    raise 'User must be provided' unless user
    category = Category.find_by(id: @category_id)
    raise 'Category must be provided' unless category
  end

  def create_win!
    @win = Win.create!(
      title: @title,
      description: @description,
      user_id: @user_id,
      category_id: @category_id,
      happened_at: @happened_at.presence || Date.current
    )
  end
end
