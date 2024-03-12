require 'rails_helper'

RSpec.describe Category, type: :model do
  it 'has a valid factory' do
    category = build(:category)
    expect(category.valid?).to be true
  end
end
