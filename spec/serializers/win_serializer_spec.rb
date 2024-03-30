require 'rails_helper'

RSpec.describe WinSerializer, type: :serializer do
  describe 'return value' do
    context 'without options' do
      it 'returns a hash' do
        win = create(:win)
        result = described_class.call!(win:)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(
          %i[id title description category_id category user_id created_at updated_at happened_at]
        )
      end
    end

    context 'with basic option' do
      it 'returns a hash' do
        win = create(:win)
        result = described_class.call!(win:, basic: true)
        expect(result).to be_a(Hash)
        expect(result.keys).to match_array(%i[id title description happened_at])
      end
    end
  end
end
