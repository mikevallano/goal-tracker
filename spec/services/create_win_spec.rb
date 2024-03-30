require 'rails_helper'

RSpec.describe CreateWin, type: :service do
  subject(:result) { described_class.call!(params:) }

  let(:params) do
    {
      title: 'tester',
      user_id: create(:user).id,
      category_id: create(:category).id
    }
  end

  describe 'when success' do
    it 'creates a win' do
      expect { result }.to change { Win.count }.by(1)
      expect(result.success?).to be true
      expect(result.win).to be_a(Win)
    end
  end

  describe 'when failure' do
    context 'without a title' do
      let(:params) do
        super().merge(title: '')
      end

      it 'is a failure' do
        expect { result }.not_to(change { Win.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('title')
      end
    end

    context 'without a user' do
      let(:params) do
        super().merge(user_id: nil)
      end

      it 'is a failure' do
        expect { result }.not_to(change { Win.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('user')
      end
    end

    context 'without a category' do
      let(:params) do
        super().merge(category_id: nil)
      end

      it 'is a failure' do
        expect { result }.not_to(change { Win.count })
        expect(result.failure?).to be true
        expect(result.error_message.downcase).to include('category')
      end
    end
  end
end
