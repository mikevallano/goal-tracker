module JsonWebToken
  def self.encode(payload)
    JWT.encode(payload, Rails.application.credentials.jwt[:secret_key], 'HS256')
  end

  def self.decode(payload)
    JWT.decode(payload, Rails.application.credentials.jwt[:secret_key], 'HS256').first
  end
end
