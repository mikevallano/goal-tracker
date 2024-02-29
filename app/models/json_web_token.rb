module JsonWebToken
  def self.encode(payload, expiration_mins: 60)
    expiration = expiration_mins.minutes.from_now.to_i
    JWT.encode(payload.merge(exp: expiration), Rails.application.credentials.jwt[:secret_key], 'HS256')
  end

  def self.decode(payload)
    JWT.decode(payload, Rails.application.credentials.jwt[:secret_key], 'HS256').first
  end
end
