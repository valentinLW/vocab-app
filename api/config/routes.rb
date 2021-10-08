Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    get 'boards', to: 'boxes#index'
    get 'boards/:id', to: 'boxes#show'
  end
end
