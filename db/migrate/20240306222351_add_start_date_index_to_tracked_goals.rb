class AddStartDateIndexToTrackedGoals < ActiveRecord::Migration[7.1]
  def change
    remove_index :tracked_goals, :goal_id
    add_index :tracked_goals, %i[goal_id start_date]
  end
end
