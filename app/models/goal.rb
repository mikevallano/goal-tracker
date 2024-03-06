class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :tracked_goals

  validates :name, presence: true
end
