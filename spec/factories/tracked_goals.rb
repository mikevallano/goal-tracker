FactoryBot.define do
  factory :tracked_goal do
    timeframe_type { 'week' }
    association :goal
    progress_rating { 1 }
    start_date { nil }
    end_date { nil }

    trait :day do
      timeframe_type { 'week' }
      start_date { Date.current.beginning_of_day }
      end_date { Date.current.end_of_day }
    end
    trait :week do
      timeframe_type { 'week' }
      start_date { Date.current.beginning_of_week(user.week_starts_on_day_sym).beginning_of_day }
      end_date { Date.current.end_of_week.end_of_day }
    end
    trait :quarter do
      start_date { Date.current.beginning_of_quarter.beginning_of_day }
      end_date { Date.current.end_of_quarter.end_of_day }
    end
    trait :year do
      timeframe_type { 'year' }
      start_date { Date.current.beginning_of_year.beginning_of_day }
      end_date { Date.current.end_of_year.end_of_day }
    end
  end
end
