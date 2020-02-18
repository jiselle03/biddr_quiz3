Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do 
      resources :auctions do
        resources :bids
      end
      resource :session, only: [:create, :destroy]
      resources :users, only: [:create] do
        get :current, on: :collection
      end
    end
  end
end
