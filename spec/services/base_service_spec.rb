require 'rails_helper'

class DummyService < BaseService
  def initialize(user:)
    @user = user
  end

  def call!
    raise 'User must be provided' unless @user.is_a?(User)
    success(user: @user)
  rescue StandardError => e
    failure(error_message: e.message)
  end
end

RSpec.describe BaseService, type: :service do
  context 'when success' do
    it 'returns a success' do
      user = create(:user)
      result = DummyService.call!(user:)
      expect(result.success?).to be true
      expect(result.user).to eq(user)
    end
  end

  context 'when failure' do
    it 'returns a failure' do
      result = DummyService.call!(user: nil)
      expect(result.success?).to be false
      expect(result.error_message).to eq('User must be provided')
    end
  end
end
