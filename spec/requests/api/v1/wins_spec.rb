require 'rails_helper'

RSpec.describe 'Api::V1::Wins', type: :request do
  let(:current_user) { create(:user) }

  before { authenticate_user(current_user) }

  describe 'GET /index' do
    it 'is successful' do
      existing_win = create(:win, user: current_user)
      get api_v1_wins_path
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(existing_win.title)
    end
  end

  describe 'POST /create' do
    context 'when successful' do
      let(:request) do
        post api_v1_wins_path, params: { title: 'tester', category_id: create(:category).id }
      end

      it 'is successful' do
        expect { request }.to change { Win.count }.by(1)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when failure' do
      let(:request) do
        post api_v1_wins_path, params: { title: '', category_id: create(:category).id }
      end

      it 'is successful' do
        expect { request }.not_to(change { Win.count })
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error'].downcase).to include('title')
      end
    end
  end
end
