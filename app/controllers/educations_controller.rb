class EducationsController < PersonRelationsController
  self.permitted_attrs = %i[location title year_from year_to person_id]
end
