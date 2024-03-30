require 'rails_helper'

RSpec.describe Win, type: :model do
  it 'has a valid factory' do
    win = build(:win)
    expect(win.valid?).to be true
  end
end
