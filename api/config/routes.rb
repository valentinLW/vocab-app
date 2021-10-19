Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    get 'boxes', to: 'boxes#index'
    post 'boxes/new', to: 'boxes#new'
    get 'boxes/:id', to: 'boxes#show'
    get 'boxes/:id/reset', to: 'boxes#reset'
    delete 'boxes/:id', to: 'boxes#delete'
    patch 'cards/:id', to: 'cards#update'
    delete 'cards/:id', to: 'cards#destroy'
    post 'cards/new', to: 'cards#new'
    post 'cards/new_batch', to: 'cards#new_batch'
    patch 'slots/:id', to: 'slots#update'
  end
end
