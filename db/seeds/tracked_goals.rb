require 'factory_bot_rails'

module Seeds
  module TrackedGoals
    def self.create!
      if TrackedGoal.all.count > 10
        puts 'TrackedGoals already exist'
      else
        create_default_user_tracked_goals!
        create_tracked_goals!
      end
    end

    def self.create_default_user_tracked_goals!
      default_user = User.find_by(email: Seeds::Users::DEFAULT_USER_EMAIL)
      goals = default_user.goals
      5.times do
        goal = goals.sample
        FactoryBot.create(:tracked_goal, goal:)
        puts "tracked goal created for default user for goal: #{goal.name} *****"
      end
    end

    def self.create_tracked_goals!
      goals = Goal.all
      10.times do
        goal = goals.sample
        FactoryBot.create(:tracked_goal, goal:)
        puts "tracked goal created for goal: #{goal.name} *****"
      end
    end
  end
end
