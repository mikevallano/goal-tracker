require 'factory_bot_rails'

module Seeds
  module Users
    DEFAULT_USER_EMAIL = 'archie@example.com'.freeze
    def self.create!
      if User.count > 3
        puts 'Users already exist'
      else
        create_default_user!
        create_users!
      end
    end

    def self.create_default_user!
      default_user = User.find_or_create_by(
        email: DEFAULT_USER_EMAIL,
        password: 'test1234'
      )
      puts "default user created: #{default_user.email} **************"
    end

    def self.create_users!(count: 10)
      count.times do
        user = FactoryBot.create(:user, email: FFaker::Internet.safe_email)
        puts "user created : #{user.email} *****"
      end
    end
  end
end
