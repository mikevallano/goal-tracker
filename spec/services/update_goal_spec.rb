require 'rails_helper'

RSpec.describe UpdateGoal, type: :service do
  subject(:result) { described_class.call!(goal:, params:) }

  let(:goal) { create(:goal) }
  let(:name) { 'New Name' }
  let(:archived_at) { Time.zone.now }

  context 'when the goal is updated' do
    let(:params) do
      {
        name:,
        archived_at:
      }
    end

    it 'updates the goal' do
      expect { result }.to change { goal.reload.name }
        .from(goal.name).to(name)
        .and change { goal.reload.archived_at }.from(nil)
    end

    it 'returns the updated goal' do
      expect(result.goal).to eq(goal)
    end
  end

  context 'with an error' do
    context 'when the goal is not found' do
      let(:goal) { nil }
      let(:params) { { name: } }

      it 'returns a failure' do
        result
        expect(result.failure?).to be(true)
        expect(result.error_message).to eq('Goal is required')
      end
    end

    context 'when the goal is not updated due to validation error' do
      let(:params) { { name: nil } }

      it 'returns a failure' do
        result
        expect(result.failure?).to be(true)
        expect(result.error_message).to eq("Validation failed: Name can't be blank")
      end

      it 'does not update the goal' do
        expect { result }.not_to(change { goal.reload.attributes })
      end
    end
  end
end
