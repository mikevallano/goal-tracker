class TrackedGoal < ApplicationRecord
  belongs_to :goal
  enum timeframe_type: %w[day week quarter year].index_with(&:to_s)
end
