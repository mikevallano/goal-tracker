require 'rails_helper'

RSpec.describe TrackedGoalsFilter, type: :service do
  describe 'when success' do
    it 'returns a filtered collection' do
      user = create(:user)
      goal = create(:goal, user:)
      tracked_goal_this_week = create(:tracked_goal, :this_week, goal:)
      tracked_goal_next_week = create(:tracked_goal, :next_week, goal:)

      result = described_class.call!(user:, filter: 'this-week')

      expect(result.success?).to be true
      expect(result.tracked_goals).to be_a(ActiveRecord::Relation)
      expect(result.tracked_goals).to include(tracked_goal_this_week)
      expect(result.tracked_goals).not_to include(tracked_goal_next_week)
    end
  end

  describe 'when failure' do
    context 'without a user' do
      it 'returns an error message' do
        result = described_class.call!(user: create(:goal), filter: 'this-week')
        expect(result.failure?).to be true
        expect(result.error_message).to include('User')
      end
    end

    context 'with an invalid filter' do
      it 'returns an error message' do
        result = described_class.call!(user: create(:user), filter: 'wrong')
        expect(result.failure?).to be true
        expect(result.error_message).to include('Filter')
      end
    end
  end
end
