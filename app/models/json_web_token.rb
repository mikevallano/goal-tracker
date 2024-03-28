module JsonWebToken
  def self.encode(payload, expiration_mins: 60)
    expiration = expiration_mins.minutes.from_now.to_i
    secret_key = ENV['JWT_SECRET_KEY'] || Rails.application.credentials.jwt[:secret_key]
    JWT.encode(payload.merge(exp: expiration), secret_key, 'HS256')
  end

  def self.decode(token)
    secret_key = ENV['JWT_SECRET_KEY'] || Rails.application.credentials.jwt[:secret_key]
    JWT.decode(token, secret_key, 'HS256').first
  end
end
