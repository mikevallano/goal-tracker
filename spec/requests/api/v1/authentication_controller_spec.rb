require 'rails_helper'

RSpec.describe '/api/v1/authentication', type: :request do
  describe 'PUT /create' do
    context 'with valid login credentials' do
      it 'renders a successful response with a JWT' do
        user = create(:user)
        post api_v1_login_path, params: { email: user.email, password: user.password }
        expect(response).to be_successful
        token = JSON.parse(response.body)['auth_token']
        expect(JsonWebToken.decode(token)).to include({ 'subject' => user.id })
      end
    end

    context 'with invalid credentials' do
      it 'returns 404 if user is not found' do
        user = create(:user)
        post api_v1_login_path, params: { email: 'wrong', password: user.password }
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['error']).to include('Invalid')
      end

      it 'returns 401 with wrong password' do
        user = create(:user)
        post api_v1_login_path, params: { email: user.email, password: 'wrong' }
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['error']).to include('Invalid')
      end
    end
  end
end
