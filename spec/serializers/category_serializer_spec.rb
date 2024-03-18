require 'rails_helper'

RSpec.describe CategorySerializer, type: :serializer do
  describe 'return value' do
    context 'without options' do
      it 'returns a hash' do
        category = create(:category)
        result = described_class.call!(category:)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(%i[id name user_id created_at updated_at])
      end
    end

    context 'with basic option' do
      it 'returns a hash' do
        category = create(:category)
        result = described_class.call!(category:, basic: true)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(%i[id name])
      end
    end
  end
end
