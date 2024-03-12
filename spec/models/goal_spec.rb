require 'rails_helper'

RSpec.describe Goal, type: :model do
  it 'has a valid factory' do
    goal = build(:goal)
    expect(goal.valid?).to be true
  end
end
