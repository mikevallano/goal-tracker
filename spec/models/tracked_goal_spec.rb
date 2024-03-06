require 'rails_helper'

RSpec.describe TrackedGoal, type: :model do
  it 'has a valid factory' do
    tracked_goal = build(:tracked_goal)
    expect(tracked_goal.valid?).to be true
  end

  it 'can set start and end date' do
    tracked_goal = build(:tracked_goal)
    tracked_goal.start_date =
      Date.current.send(
        "beginning_of_#{tracked_goal.timeframe_type}", :saturday
      ).beginning_of_day
    tracked_goal.end_date = Date.current.end_of_week.end_of_day
    tracked_goal.save!

    res = described_class
          .where(start_date: Date.current.beginning_of_week(:saturday)
          .beginning_of_day)
    expect(res).to include(tracked_goal)
  end
end
