class CompanySerializer < ApplicationSerializer

  attributes :id, :name, :web, :email, :phone, :partnermanager, :contact_person,
             :email_contact_person, :phone_contact_person, :crm, :level, :offer_comment,
             :my_company, :created_at, :updated_at
  
  has_many :people, serializer: PersonInCompanySerializer
  has_many :locations, include: :all
  has_many :employee_quantities, include: :all
  has_many :offers, include: :all

end
