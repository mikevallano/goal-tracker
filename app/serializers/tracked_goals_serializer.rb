class TrackedGoalsSerializer < BaseSerializer
  def initialize(tracked_goals:)
    @tracked_goals = tracked_goals
  end

  def call!
    serialized_result
  end

  private

  def serialized_result
    @tracked_goals.map do |tracked_goal|
      TrackedGoalSerializer.call!(tracked_goal:)
    end
  end
end
