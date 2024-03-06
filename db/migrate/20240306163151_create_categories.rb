class CreateCategories < ActiveRecord::Migration[7.1]
  def up
    return if table_exists?(:categories)
    create_table :categories do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    nil unless table_exists?(:categories)
  end
end
