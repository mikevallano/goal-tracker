Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # TODO: needs to sync to staging and production as well
    origins 'localhost:3000', '127.0.0.1:3000', 'localhost:3001', '127.0.0.1:3001'
    resource '*', headers: :any, methods: %i[get post patch put], credentials: true
  end
end
