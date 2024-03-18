require 'rails_helper'

RSpec.describe TrackedGoalSerializer, type: :serializer do
  describe 'return value' do
    context 'without options' do
      it 'returns a hash' do
        tracked_goal = create(:tracked_goal)
        result = described_class.call!(tracked_goal:)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(
          %i[id goal_id goal progress_rating notes created_at updated_at start_date end_date timeframe_type]
        )
      end
    end
  end
end
