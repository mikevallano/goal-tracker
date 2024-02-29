require 'rails_helper'

RSpec.describe JsonWebToken, type: :model do
  it 'encodes and decodes with JWT' do
    payload = { 'subject' => 10 }
    token = described_class.encode(payload)
    decoded_token = described_class.decode(token)
    expect(decoded_token).to include(payload)
  end

  describe 'expiration time' do
    it 'defaults an expiration time' do
      current_time = Time.utc(2024, 3, 1, 12, 0, 0)
      allow(Time).to receive(:now).and_return(current_time)
      payload = { 'subject' => 10 }
      token = described_class.encode(payload)
      decoded_token = described_class.decode(token)
      expect(decoded_token).to include(payload)
      expect(decoded_token).to include({ 'exp' => 60.minutes.from_now.to_i })
    end

    it 'accepts an optional expiration time' do
      current_time = Time.utc(2024, 3, 1, 12, 0, 0)
      allow(Time).to receive(:now).and_return(current_time)
      payload = { 'subject' => 10 }
      token = described_class.encode(payload, expiration_mins: 5)
      decoded_token = described_class.decode(token)
      expect(decoded_token).to include(payload)
      expect(decoded_token).to include({ 'exp' => 5.minutes.from_now.to_i })
    end
  end
end
