class WinSerializer < BaseSerializer
  def initialize(win:, basic: false)
    @win = win
    @basic = basic
  end

  def call!
    serialized_result
  end

  private

  def basic_result
    {
      id: @win.id,
      title: @win.title,
      description: @win.description,
      happened_at: @win.happened_at
    }
  end

  def serialized_result
    return basic_result if @basic
    basic_result.merge(
      user_id: @win.user_id,
      category_id: @win.category_id,
      created_at: @win.created_at,
      updated_at: @win.updated_at,
      category: CategorySerializer.call!(category: @win.category, basic: true)
    )
  end
end
