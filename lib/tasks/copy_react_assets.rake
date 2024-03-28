namespace :react do
  desc 'Copy React assets to public directory'
  task copy_assets: :environment do
    source_dir = Rails.root.join('react', 'dist')
    destination_dir = Rails.root.join('public')

    puts "Copying React assets from #{source_dir} to #{destination_dir}..."

    FileUtils.cp_r(Dir.glob("#{source_dir}/*"), destination_dir)

    puts 'Done.'
  end
end
