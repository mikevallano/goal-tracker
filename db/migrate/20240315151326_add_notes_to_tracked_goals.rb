class AddNotesToTrackedGoals < ActiveRecord::Migration[7.1]
  def up
    return if column_exists?(:tracked_goals, :notes)
    add_column(:tracked_goals, :notes, :text)
  end

  def down
    return unless column_exists?(:tracked_goals, :notes)
    remove_column(:tracked_goals, :notes, :text)
  end
end
