require 'factory_bot_rails'

module Seeds
  module Wins
    def self.create!
      if Win.all.count > 10
        puts 'Wins already exist'
      else
        create_default_user_wins!
        create_wins!
      end
    end

    def self.create_default_user_wins!
      default_user = User.find_by(email: Seeds::Users::DEFAULT_USER_EMAIL)
      categories = default_user.categories
      5.times do
        category = categories.sample
        FactoryBot.create(:win, user: default_user, category:)
        puts "win created for default user for category: #{category.name} *****"
      end
    end

    def self.create_wins!
      categories = Category.all
      users = User.where.not(email: Seeds::Users::DEFAULT_USER_EMAIL)
      10.times do
        category = categories.sample
        user = users.sample
        FactoryBot.create(:win, user:, category:)
        puts "win created for category: #{category.name} *****"
      end
    end
  end
end
