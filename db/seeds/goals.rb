require 'factory_bot_rails'

module Seeds
  module Goals
    def self.create!
      if Goal.all.count > 10
        puts 'Goals already exist'
      else
        create_default_user_goals!
        create_goals!
      end
    end

    def self.create_default_user_goals!
      default_user = User.find_by(email: Seeds::Users::DEFAULT_USER_EMAIL)
      5.times do
        goal = FactoryBot.create(:goal, user: default_user)
        puts "goal created for default user: #{goal.name} *****"
      end
    end

    def self.create_goals!
      users = User.joins(:categories).all
      10.times do
        goal = FactoryBot.create(:goal, user: users.sample)
        puts "goal created: #{goal.name} *****"
      end
    end

    def self.generate_name_or_description
      FFaker::Lorem.words(rand(3..10)).join(' ')
    end
  end
end
