Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    scope '/auth' do
      post 'sign_in', to: 'authentication#sign_in'
    end

    resources :statuses
    resources :people do
      resources :advanced_trainings, controller: 'person/advanced_trainings'
      resources :activities, controller: 'person/activities'
      resources :projects, controller: 'person/projects'
      resources :educations, controller: 'person/educations'
      resources :competences, controller: 'person/competences'
      resources :variations, controller: 'person/variations'
      get 'picture'
    end
  end
end
