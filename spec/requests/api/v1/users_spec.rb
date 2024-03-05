require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'POST /create' do
    context 'with valid params' do
      it 'returns http success' do
        user = build(:user)
        expect do
          post('/api/v1/signup', params: { email: user.email, password: user.password })
        end.to change { User.count }.by(1)
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)['email']).to eq(user.email)
      end
    end

    context 'when failure' do
      it 'returns failure code' do
        user = build(:user, password: '')
        post '/api/v1/signup', params: { email: user.email, password: user.password }
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error']).to include('Password')
      end
    end
  end
end
