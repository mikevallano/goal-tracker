class RemoveUsernameFromUsers < ActiveRecord::Migration[7.1]
  def up
    return unless column_exists?(:users, :username)
    remove_column(:users, :username)
  end

  def down
    return if column_exists?(:users, :username)
    add_column(:users, :username, :string)
  end
end
