Rails.application.routes.draw do
  devise_for :users
  # root 'pages#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post 'login', to: 'authentication#create'
      get 'ping' => 'test#ping'
      post 'signup', to: 'users#create'
      resources :categories
      resources :goals
      resources :tracked_goals
      resources :wins
    end
  end

  root 'public#index'
  # The env var is for testing in development.
  if ENV['RAILS_SERVE_STATIC_FILES'].present? || Rails.env.production?
    # get '*path', to: 'static#index', constraints: lambda { |req|
    #   req.path.exclude?('rails/active_storage') && !req.path.blank?
    # }
    get '*path', to: static('index.html')
    # post '*path', to: static('index.html')
  end
end
