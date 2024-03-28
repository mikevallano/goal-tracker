class StaticController < ApplicationController
  def index
    render file: Rails.public_path.join('public', 'index.html'), layout: false
  end
end
