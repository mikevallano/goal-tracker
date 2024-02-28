if User.count > 3
  puts 'Users already exist'
else
  5.times do
    user = User.create!(
      username: FFaker::Internet.user_name,
      email: FFaker::Internet.safe_email,
      password: FFaker::Internet.password
    )
    puts "user created : #{user.username} *****"
  end
end
