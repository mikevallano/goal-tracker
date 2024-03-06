require_relative './seeds/users'
require_relative './seeds/categories'
require_relative './seeds/goals'
require_relative './seeds/tracked_goals'

ActiveRecord::Base.transaction do
  Seeds::Users.create!
  Seeds::Categories.create!
  Seeds::Goals.create!
  Seeds::TrackedGoals.create!
end
