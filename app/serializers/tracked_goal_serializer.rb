class TrackedGoalSerializer < BaseSerializer
  def initialize(tracked_goal:)
    @tracked_goal = tracked_goal
  end

  def call!
    @tracked_goal.attributes.merge('goal' => @tracked_goal.goal.name)
  end
end
