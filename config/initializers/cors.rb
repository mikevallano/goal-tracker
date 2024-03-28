# Original setup
# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     # TODO: needs to sync to staging and production as well
#     origins 'localhost:3000', '127.0.0.1:3000', 'localhost:3001', '127.0.0.1:3001'
#     resource '*', headers: :any, methods: %i[get post patch put], credentials: true
#   end
# end

# setup suggested by devise-jwt gem
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # TODO: origins need to include actual production url for frontend
    origins('localhost:3000', '127.0.0.1:3000', 'localhost:3001', '127.0.0.1:3001', 'https://goal-tracking-1ee07128703e.herokuapp.com/')
    resource(
      '/api/*',
      headers: %w[Authorization],
      methods: %i[get post patch put],
      expose: %w[Authorization],
      max_age: 600
    )
  end
end
