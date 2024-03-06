class CreateTrackedGoals < ActiveRecord::Migration[7.1]
  def up
    return if table_exists?(:tracked_goals)
    create_table :tracked_goals do |t|
      t.string :timeframe_type, null: false, default: 'week'
      t.integer :progress_rating
      t.references :goal, null: false, foreign_key: true
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end

  def down
    return unless table_exists?(:tracked_goals)
    drop_table(:tracked_goals)
  end
end
