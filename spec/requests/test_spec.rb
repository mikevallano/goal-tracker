require 'rails_helper'

RSpec.describe '/api/v1/test', type: :request do
  describe 'GET /ping' do
    let(:url) { api_v1_ping_path }
    let(:current_user) { create(:user) }

    before { authenticate_user(current_user) }

    it 'renders a successful response' do
      get url
      expect(response).to be_successful
    end
  end
end
