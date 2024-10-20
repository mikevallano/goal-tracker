class PublicController < ApplicationController
  def index
    if Rails.env.production?
      render file: Rails.public_path.join('index.html'), layout: false
    else
      redirect_to 'http://localhost:3001'
    end
  end
end
