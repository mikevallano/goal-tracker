require 'rails_helper'

RSpec.describe Api::BaseController, type: :controller do
  # abstract controller to test base controller behavior
  controller do
    def index
      render plain: 'abstract test'
    end
  end

  describe '#authenticate_token!' do
    context 'with a valid token' do
      it 'sets @current_user' do
        user = create(:user)
        token = JsonWebToken.encode({ subject: user.id })
        request.headers['Authorization'] = "Bearer #{token}"
        get :index
        expect(controller.instance_variable_get(:@current_user)).to eq(user)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with an invalid token' do
      it 'returns a 401 when an invalid token is provided' do
        request.headers['Authorization'] = 'Bearer invalid_token'
        get :index
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns a 401 when token is expired' do
        user = create(:user)
        token = JsonWebToken.encode({ subject: user.id }, expiration_mins: 0)
        request.headers['Authorization'] = "Bearer #{token}"
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when the user is not found' do
      controller do
        def index
          User.find('wrong_id')
          render plain: 'abstract test'
        end
      end

      it 'returns a 404' do
        user = create(:user)
        token = JsonWebToken.encode({ subject: user.id })
        request.headers['Authorization'] = "Bearer #{token}"
        get :index
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
