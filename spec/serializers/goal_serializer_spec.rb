require 'rails_helper'

RSpec.describe GoalSerializer, type: :serializer do
  describe 'return value' do
    context 'without options' do
      it 'returns a hash' do
        goal = create(:goal)
        result = described_class.call!(goal:)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(
          %i[id name description category_id category user_id created_at updated_at archived_at]
        )
      end
    end

    context 'with basic option' do
      it 'returns a hash' do
        goal = create(:goal)
        result = described_class.call!(goal:, basic: true)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(%i[id name])
      end
    end
  end
end
