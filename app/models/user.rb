class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, :password, presence: true
  validates :email, uniqueness: true

  has_many :categories
  has_many :goals

  enum week_starts_on_day: %w[monday tuesday wednesday thursday friday saturday sunday].index_with(&:to_s)

  def week_starts_on_day_sym
    week_starts_on_day.to_sym
  end
end
