require 'rails_helper'

RSpec.describe 'Api::V1::Categories', type: :request do
  let(:current_user) { create(:user) }

  before { authenticate_user(current_user) }

  describe 'GET #index' do
    it 'is successful' do
      get api_v1_categories_path
      expect(response).to have_http_status(:success)
    end

    context 'with categories' do
      it 'returns categories' do
        category = create(:category, user: current_user)
        get api_v1_categories_path
        expect(response.body).to include(category.name)
      end
    end
  end

  describe 'POST #create' do
    context 'when success' do
      it 'creates a category' do
        expect { post api_v1_categories_path, params: { name: 'tester' } }.to change { Category.count }.by(1)
      end

      it 'returns created category data' do
        name = 'tester'
        post api_v1_categories_path, params: { name: }
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)['name']).to eq(name)
      end
    end

    context 'when failure' do
      it 'returns an error message' do
        post api_v1_categories_path, params: { name: '' }
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error']).to include('Name is required')
      end
    end
  end
end
