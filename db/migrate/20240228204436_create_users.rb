class CreateUsers < ActiveRecord::Migration[7.1]
  def up
    return if table_exists?(:users)
    create_table :users do |t|
      t.string :username, null: false
      t.string :password # , null: false
      t.string :email, null: false

      t.timestamps
    end
  end

  def down
    return unless table_exists?(:users)
    drop_table(:users)
  end
end
