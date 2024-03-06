class AddWeekStartDateToUsers < ActiveRecord::Migration[7.1]
  def up
    return if column_exists?(:users, :week_starts_on_day)
    add_column(:users, :week_starts_on_day, :string, null: false, default: 'monday')
  end

  def down
    return unless column_exists?(:users, :week_starts_on_day)
    remove_column(:users, :week_starts_on_day)
  end
end
