require 'rails_helper'

RSpec.describe TrackedGoal, type: :model do
  it 'has a valid factory' do
    tracked_goal = build(:tracked_goal)
    expect(tracked_goal.valid?).to be true
  end

  describe 'enum' do
    it 'validates enum' do
      expect { build(:tracked_goal, timeframe_type: 'wrong') }.to raise_error(ArgumentError)
    end
  end

  describe 'scopes' do
    describe '.by_user' do
      it 'returns the correct records' do
        user1 = create(:user)
        user2 = create(:user)
        tracked_goal1 = create(:tracked_goal, goal: create(:goal, user: user1))
        create(:tracked_goal, goal: create(:goal, user: user2))
        res = described_class.by_user(user1)
        expect(res).to eq([tracked_goal1])
      end
    end

    describe '.by_week' do
      it 'returns matching records' do
        goal = create(:goal)
        tracked_goal1 = create(:tracked_goal, :week, goal:)
        tracked_goal2 = create(:tracked_goal, :week, goal:, start_date: 2.weeks.ago)
        res = described_class.by_user(goal.user).by_week(Date.current)
        expect(res).not_to include([tracked_goal2])
        expect(res).to eq([tracked_goal1])
      end
    end

    describe '.by_week_by_user' do
      it 'returns matching records' do
        goal = create(:goal)
        tracked_goal1 = create(:tracked_goal, :week, goal:)
        tracked_goal2 = create(:tracked_goal, :week, goal:, start_date: 2.weeks.ago)
        res = described_class.by_week_by_user(Date.current, goal.user)
        expect(res).not_to include([tracked_goal2])
        expect(res).to eq([tracked_goal1])
      end
    end
  end
end
