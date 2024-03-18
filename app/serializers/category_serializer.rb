class CategorySerializer < BaseSerializer
  def initialize(category:, basic: false)
    @category = category
    @basic = basic
  end

  def call!
    serialized_result
  end

  private

  def basic_result
    { id: @category.id,
      name: @category.name }
  end

  def serialized_result
    return basic_result if @basic
    basic_result.merge(
      user_id: @category.user_id,
      created_at: @category.created_at,
      updated_at: @category.updated_at
    )
  end
end
