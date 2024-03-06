FactoryBot.define do
  factory :tracked_goal do
    timeframe_type { 'week' }
    association :goal
    progress_rating { 1 }
    start_date { nil }
    end_date { nil }
  end
end
