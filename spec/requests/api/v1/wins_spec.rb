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
end
