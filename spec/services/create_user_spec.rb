require 'rails_helper'

RSpec.describe CreateUser, type: :service do
  context 'when success' do
    let(:result) { described_class.call!(email: user.email, password: user.password) }
    let(:user) { build(:user) }

    it 'creates and returns a user' do
      expect { result }.to change { User.count }.by(1)
      expect(result.success?).to be true
      expect(result.user).to be_a(User)
      expect(result.user.email).to eq(user.email)
      expect(result.error_message).to be nil
    end
  end

  describe 'when failure' do
    context 'when password is too short' do
      let(:result) { described_class.call!(email: user.email, password: user.password) }
      let(:user) { build(:user, password: 'lol') }

      it 'does not create a user' do
        expect { result }.not_to(change { User.count })
        expect(result.failure?).to be true
        expect(result.error_message).to include('Password is too short')
      end
    end

    context 'when missing email' do
      let(:result) { described_class.call!(email: user.email, password: user.password) }
      let(:user) { build(:user, email: '') }

      it 'does not create a user' do
        expect { result }.not_to(change { User.count })
        expect(result.failure?).to be true
        expect(result.error_message).to include('Email must be provided')
      end
    end

    context 'when missing password' do
      let(:result) { described_class.call!(email: user.email, password: user.password) }
      let(:user) { build(:user, password: '') }

      it 'does not create a user' do
        expect { result }.not_to(change { User.count })
        expect(result.failure?).to be true
        expect(result.error_message).to include('Password must be provided')
      end
    end
  end
end
