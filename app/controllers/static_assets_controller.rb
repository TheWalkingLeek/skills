class StaticAssetsController < ActionController::Base

  protect_from_forgery with: :exception

  def index
    render file: Rails.root.join('public/index.html')
  end

end
