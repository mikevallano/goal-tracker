class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :tracked_goals

  validates :name, presence: true

  scope :archived, -> { where.not(archived_at: nil) }
  scope :active, -> { where(archived_at: nil) }
end
