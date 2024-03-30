class CreateWins < ActiveRecord::Migration[7.1]
  def up
    return if table_exists?(:wins)
    create_table :wins do |t|
      t.string :title, null: false
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.datetime :happened_at

      t.timestamps
    end
  end

  def down
    return unless table_exists?(:wins)
    drop_table(:wins)
  end
end
