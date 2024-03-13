class TrackedGoalsSerializer
  def self.render(tracked_goals)
    tracked_goals.map do |tracked_goal|
      tracked_goal.attributes.merge('goal' => tracked_goal.goal.name)
    end
  end
end
