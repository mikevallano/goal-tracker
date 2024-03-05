class CreateUser < BaseService
  attr_reader :email, :password

  def initialize(email:, password:)
    @email = email
    @password = password
  end

  def call!
    validate_params!
    create_user!
    success(user: @user)
  rescue StandardError => e
    failure(error_message: e.message)
  end

  private

  def validate_params!
    raise 'Email must be provided' if @email.blank?
    raise 'Password must be provided' if @password.blank?
  end

  def create_user!
    @user = User.create!(email:, password:)
  end
end
