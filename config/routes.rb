Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :edit, :update]
    resource :session, only: [:create, :destroy]
    resources :binges, except: [:new, :edit]
    resources :boards, except: [:new, :edit]
    resources :bingings, only: [:create, :destroy]
  end
end
