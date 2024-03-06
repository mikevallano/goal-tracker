require 'factory_bot_rails'

module Seeds
  module Categories
    def self.create!
      if Category.count > 10
        puts 'Categories already exist'
      else
        create_default_user_categories!
        create_categories!
      end
    end

    def self.create_default_user_categories!
      default_user = User.find_by(email: Seeds::Users::DEFAULT_USER_EMAIL)
      3.times do
        word_count = [1, 2].sample
        category = Category.create!(
          user: default_user,
          name: word_count == 2 ? FFaker::Lorem.words(2).join(' ') : FFaker::Lorem.word
        )
        puts "default user category created:  : #{category.name} *****"
      end
    end

    def self.create_categories!
      users = User.all
      7.times do
        word_count = [1, 2].sample
        category = Category.create!(
          user: users.sample,
          name: word_count == 2 ? FFaker::Lorem.words(2).join(' ') : FFaker::Lorem.word
        )
        puts "category created: #{category.name} *****"
      end
    end
  end
end
