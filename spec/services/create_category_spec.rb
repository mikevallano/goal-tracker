require 'rails_helper'

RSpec.describe CreateCategory, type: :service do
  subject(:result) { described_class.call!(user_id:, name:) }

  context 'when success' do
    let(:user) { create(:user) }
    let(:name) { 'financial' }
    let(:user_id) { user.id }

    it 'creates a category' do
      expect { result }.to change { Category.count }.by(1)
      expect(result.success?).to be true
      category = result.category
      expect(category).to be_a(Category)
      expect(category.name).to eq(name)
      expect(category.user).to eq(user)
    end
  end

  describe 'when failure' do
    context 'with invalid user_id' do
      let(:user_id) { 'wrong' }
      let(:name) { 'financial' }

      it 'returns the correct error' do
        expect { result }.not_to(change { Category.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('user')
      end
    end

    context 'with missing name' do
      let(:user_id) { create(:user).id }
      let(:name) { '' }

      it 'returns the correct error' do
        expect { result }.not_to(change { Category.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('name')
      end
    end
  end
end
