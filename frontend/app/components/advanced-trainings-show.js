import Component from '@ember/component';
import sortByYear from '../utils/sort-by-year';
import { computed } from '@ember/object';

export default Component.extend({
  filtered: computed('advanced-trainings.@each', function() {
    return this.get('advanced-trainings');
  }),

  filteredAdvancedTrainings: sortByYear('filtered'),
});
