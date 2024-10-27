require 'rails_helper'

RSpec.describe Api::V1::GoalsController, type: :controller do
  let(:user) { create(:user) }
  let(:category) { create(:category) }
  let(:goal) { create(:goal, user:, category:) }

  before do
    allow(controller).to receive(:authenticate_token!).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    it 'returns a list of goals' do
      goal
      get :index
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).first['name']).to eq(goal.name)
    end
  end

  describe 'POST #create' do
    let(:goal_params) { { name: 'New Goal', category_id: category.id } }

    it 'creates a new goal' do
      post :create, params: goal_params
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['name']).to eq('New Goal')
    end

    context 'with invalid params' do
      let(:goal_params) { { name: nil, category_id: category.id } }

      it 'returns a 412' do
        post :create, params: goal_params
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error']).to include('Name is required')
      end
    end
  end

  describe 'PATCH #update' do
    let(:goal_params) { { name: 'Updated Goal' } }

    it 'updates the goal' do
      patch :update, params: { id: goal.id, name: 'Updated Goal' }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['name']).to eq('Updated Goal')
    end

    it 'updates archived_at' do
      patch :update, params: { id: goal.id, archived_at: Time.zone.now }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['archived_at']).not_to be_nil
    end

    context 'with invalid params' do
      let(:goal_params) { { name: nil } }

      it 'returns a 412' do
        patch :update, params: { id: goal.id, name: nil }
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error']).to include("Validation failed: Name can't be blank")
      end
    end

    context 'when the goal is not found' do
      it 'returns a 404' do
        patch :update, params: { id: 'wrong_id' }
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
