require 'rails_helper'

RSpec.describe CreateTrackedGoal, type: :service do
  subject(:result) { described_class.call!(goal_id:, timeframe_type:) }

  let(:goal) { create(:goal) }
  let(:goal_id) { goal.id }
  let(:timeframe_type) { 'week' }

  describe 'when success' do
    it 'creates a tracked goal' do
      expect { result }.to change { TrackedGoal.count }.by(1)
      expect(result.success?).to be true
      tracked_goal = result.tracked_goal
      expect(tracked_goal.goal_id).to eq(goal_id)
      expect(tracked_goal.timeframe_type).to eq(timeframe_type)
    end
  end

  describe 'when failure' do
    context 'with an invalid goal' do
      let(:goal_id) { 'wrong' }

      it 'returns correct failure' do
        expect { result }.not_to(change { TrackedGoal.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('goal')
      end
    end

    context 'with an invalid timeframe_type' do
      let(:timeframe_type) { 'wrong' }

      it 'returns correct failure' do
        expect { result }.not_to(change { TrackedGoal.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('timeframe')
      end
    end
  end
end
