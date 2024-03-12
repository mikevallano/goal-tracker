require 'rails_helper'

RSpec.describe CreateGoal, type: :service do
  subject(:result) { described_class.call!(user_id:, name:, category_id:, description: 'test') }

  let(:name) { 'do a thing' }
  let(:user) { create(:user) }
  let(:category) { create(:category) }
  let(:category_id) { category.id }
  let(:user_id) { user.id }

  describe 'when success' do
    it 'creates a goal' do
      expect { result }.to change { Goal.count }.by(1)
      expect(result.success?).to be true
      goal = result.goal
      expect(goal.user).to eq(user)
      expect(goal.category).to eq(category)
      expect(goal.name).to eq(name)
    end
  end

  describe 'when failure' do
    context 'with an invalid user' do
      let(:user_id) { 'wrong' }

      it 'returns correct error' do
        expect { result }.not_to(change { Goal.count })
        expect(result.error_message.downcase).to include('user')
      end
    end

    context 'with an invalid category' do
      let(:category_id) { 'wrong' }

      it 'returns correct error' do
        expect { result }.not_to(change { Goal.count })
        expect(result.error_message.downcase).to include('category')
      end
    end

    context 'without a name' do
      let(:name) { '' }

      it 'returns correct error' do
        expect { result }.not_to(change { Goal.count })
        expect(result.error_message.downcase).to include('name')
      end
    end
  end
end
