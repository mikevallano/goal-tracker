namespace :react do
  desc 'Copy React assets to public directory'

  # This is a manual task to copy the compiled react assets to the public directory
  # first run `npm run build` in the react directory to compile the assets.
  # Then ensure they are in the git history.
  # Then run `rails react:copy_assets` to copy the assets to the public directory.
  task copy_assets: :environment do
    source_dir = Rails.root.join('react', 'dist')
    destination_dir = Rails.root.join('public')

    puts "Copying React assets from #{source_dir} to #{destination_dir}..."

    FileUtils.cp_r(Dir.glob("#{source_dir}/*"), destination_dir)

    puts 'Done.'
  end
end
