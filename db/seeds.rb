ARCHIE_EMAIL = 'archie@example.com'.freeze

# rubocop:disable Metrics/BlockLength
ActiveRecord::Base.transaction do
  if User.count > 3
    puts 'Users already exist'
  else
    archie = User.find_or_create_by(
      email: ARCHIE_EMAIL,
      password: 'test1234'
    )
    puts 'archie exists **************'
    5.times do
      user = User.create!(
        email: FFaker::Internet.safe_email,
        password: FFaker::Internet.password
      )
      puts "user created : #{user.email} *****"
    end
  end

  if Category.count > 10
    puts 'categories already exist'
  else
    users = User.all
    archie = users.find_by(email: ARCHIE_EMAIL)
    3.times do
      word_count = [1, 2].sample
      category = Category.create!(
        user: archie,
        name: word_count == 2 ? FFaker::Lorem.words(2).join(' ') : FFaker::Lorem.word
      )
      puts "archie category created:  : #{category.name} *****"
    end
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
# rubocop:enable Metrics/BlockLength
