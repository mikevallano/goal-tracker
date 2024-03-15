require 'rails_helper'

RSpec.describe UpdateTrackedGoal, type: :service do
  subject(:result) { described_class.call!(tracked_goal_id:, progress_rating:, notes:, user_id:) }

  let(:tracked_goal) { create(:tracked_goal, progress_rating: 1, notes: 'original notes') }
  let(:tracked_goal_id) { tracked_goal.id }
  let(:progress_rating) { 3 }
  let(:notes) { 'new notes' }
  let(:user_id) { tracked_goal.user.id }

  describe 'when success' do
    it 'updates the record' do
      expect { result }.to(change { tracked_goal.reload.notes })
      expect(result.success?).to be true
      expect(result.tracked_goal).to eq(tracked_goal)
    end
  end

  describe 'updating progress_rating' do
    context 'when a string' do
      let(:progress_rating) { '5' }

      it 'updates the record' do
        expect { result }.to(change { tracked_goal.reload.progress_rating })
        expect(result.success?).to be true
      end
    end

    context 'when nil' do
      let(:progress_rating) { nil }

      it 'does not update the value' do
        expect { result }.not_to(change { tracked_goal.reload.progress_rating })
        expect(result.success?).to be true
      end
    end

    context 'when invalid' do
      let(:progress_rating) { 8 }

      it 'does not update the record and returns an error' do
        expect { result }.not_to(change { tracked_goal.reload.progress_rating })
        expect(result.failure?).to be true
      end
    end
  end

  describe 'with blank fields' do
    context 'with no notes' do
      let(:notes) { '' }

      it 'still updates record' do
        expect { result }.to(change { tracked_goal.reload.notes })
        expect(result.success?).to be true
        expect(result.tracked_goal.reload.notes).to eq(notes)
      end
    end

    context 'without a rating' do
      it 'still updates record' do
        expect { result }.to(change { tracked_goal.reload.notes })
        expect { result }.not_to(change { tracked_goal.reload.progress_rating })
        expect(result.success?).to be true
        expect(result.tracked_goal.reload.notes).to eq(notes)
      end
    end
  end

  describe 'when failure' do
    let(:tracked_goal_id) { 'wrong' }

    it 'does not update the record' do
      expect { result }.not_to(change { tracked_goal.reload.notes })
      expect(result.failure?).to be true
      expect(result.error_message).to include('tracked_goal_id')
    end
  end
end
