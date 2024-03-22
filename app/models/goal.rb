class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :tracked_goals, dependent: :destroy # TODO: decide how to handle this

  validates :name, presence: true

  scope :archived, -> { where.not(archived_at: nil) }
  scope :active, -> { where(archived_at: nil) }
end
