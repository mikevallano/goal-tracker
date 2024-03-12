require 'rails_helper'

RSpec.describe 'Api::V1::TrackedGoals', type: :request do
  let(:current_user) { create(:user) }

  before { authenticate_user(current_user) }

  describe 'GET #index' do
    it 'returns a success status' do
      tracked_goal = create(:tracked_goal, goal: create(:goal, user: current_user))
      get api_v1_tracked_goals_path
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)[0]['goal_id']).to eq(tracked_goal.goal_id)
    end
  end

  describe 'POST #create' do
    let(:goal) { create(:goal, user: current_user) }

    context 'when success' do
      it 'creates a tracked_goal' do
        expect do
          post(api_v1_tracked_goals_path, params: { goal_id: goal.id, timeframe_type: 'week' })
        end.to change { TrackedGoal.count }.by(1)
      end

      it 'returns tracked_goal data' do
        post api_v1_tracked_goals_path, params: { goal_id: goal.id, timeframe_type: 'week' }
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)['goal_id']).to eq(goal.id)
      end
    end

    context 'when failure' do
      it 'does not create a goal' do
        expect do
          post(api_v1_tracked_goals_path, params: { goal_id: '', timeframe_type: 'week' })
        end.not_to(change { TrackedGoal.count })
      end

      it 'returns an error message' do
        post api_v1_tracked_goals_path, params: { goal_id: '', timeframe_type: 'week' }
        expect(response).to have_http_status(:precondition_failed)
        expect(JSON.parse(response.body)['error']).to include('Goal')
      end
    end
  end
end
