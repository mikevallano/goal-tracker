class GoalSerializer < BaseSerializer
  def initialize(goal:, **options)
    @goal = goal
    @options = options
  end

  def call!
    serialized_result
  end

  private

  def basic_result
    {
      id: @goal.id,
      name: @goal.name
    }
  end

  def serialized_result
    return basic_result if @options[:basic]
    basic_result.merge(
      description: @goal.description,
      user_id: @goal.user_id,
      category_id: @goal.category_id,
      archived_at: @goal.archived_at,
      created_at: @goal.created_at,
      updated_at: @goal.updated_at,
      category: CategorySerializer.call!(category: @goal.category, basic: true)
    )
  end
end
