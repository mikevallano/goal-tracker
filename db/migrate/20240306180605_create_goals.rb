class CreateGoals < ActiveRecord::Migration[7.1]
  def up
    return if table_exists?(:goals)
    create_table :goals do |t|
      t.string :name
      t.string :description
      t.datetime :archived_at
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    return unless table_exists?(:goals)
    drop_table(:goals)
  end
end
