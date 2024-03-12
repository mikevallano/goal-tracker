require 'rails_helper'

RSpec.describe 'Api::V1::Goals', type: :request do
  let(:current_user) { create(:user) }

  before { authenticate_user(current_user) }

  describe 'GET #index' do
    it 'returns a success status' do
      existing_goal = create(:goal, user: current_user)
      get api_v1_goals_path
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(existing_goal.name)
    end
  end

  describe 'POST #create' do
    let(:category) { create(:category) }

    context 'when success' do
      it 'creates a goal' do
        expect do
          post(api_v1_goals_path, params: { name: 'test', category_id: category.id })
        end.to change { Goal.count }.by(1)
      end

      it 'returns goal data' do
        name = 'testgoalname'
        post api_v1_goals_path, params: { name:, category_id: category.id }
        expect(response).to have_http_status(:success)
        expect(response.body).to include(name)
      end
    end

    context 'when failure' do
      it 'does not create a goal' do
        expect do
          post(api_v1_goals_path, params: { name: '', category_id: category.id })
        end.not_to(change { Goal.count })
      end

      it 'returns an error message' do
        post api_v1_goals_path, params: { name: '', category_id: category.id }
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error']).to include('Name')
      end
    end
  end
end
