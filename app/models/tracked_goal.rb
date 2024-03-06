class TrackedGoal < ApplicationRecord
  belongs_to :goal
  delegate :user, to: :goal
  validates :progress_rating,
            inclusion: {
              in: [1, 2, 3, 4, 5],
              message: '%<value>s is not a valid rating'
            }
  enum timeframe_type: %w[day week quarter year].index_with(&:to_s)

  scope :by_user, ->(user) { joins(:goal).where(goals: { user_id: user.id }) }
  scope :by_week, lambda { |date|
    start_date = date.beginning_of_week.beginning_of_day
    where(start_date:).week
  }
  scope :by_week_by_user, lambda { |date, user|
    start_date = date.beginning_of_week(user.week_starts_on_day_sym).beginning_of_day
    where(start_date:, goal_id: user.goals).week
  }
end
