import { inject as service } from '@ember/service';
import Component from '@ember/component';
import sortByYear from "../utils/sort-by-year";
import { computed } from '@ember/object';

export default Component.extend({
  /* exclude where id like null */
  filteredAdvancedTrainings: computed('@each.id', function() {
    return this.get('sortedAdvancedTrainings').filterBy('id');
  }),

  sortedAdvancedTrainings: sortByYear('advanced-trainings'),

  i18n: service(),

  actions: {
    submit(person) {
      person.save()
        .then (() =>
          Promise.all([
            ...person
              .get('advancedTrainings')
              .map(advancedTraining => advancedTraining.save())
          ])
        )
        .then (() => this.sendAction('submit'))
        .then (() => this.get('notify').success('Successfully saved!'))

        .catch(() => {
          let advancedTrainings = this.get('advanced-trainings');
          advancedTrainings.forEach(advancedTraining => {
            let errors = advancedTraining.get('errors').slice();

            advancedTraining.rollbackAttributes();

            errors.forEach(({ attribute, message }) => {
              let translated_attribute = this.get('i18n').t(`advancedTraining.${attribute}`)['string']
              this.get('notify').alert(`${translated_attribute} ${message}`, { closeAfter: 10000 });
            });
          });
        });
    },
    deleteAdvancedTrainings(advancedTraining) {
      advancedTraining.destroyRecord()
        .then(advanced_training => this.sendAction('done'))
        .then(() => this.get('notify').success('Weiterbildung wurde entfernt!'))
    },
    confirmDestroy(advancedTraining) {
      this.send('deleteAdvancedTrainings', advancedTraining);
    },
    abortEdit() {
      let advancedTrainings = this.get('person.advancedTrainings').toArray();
      advancedTrainings.forEach(advancedTraining => {
        if (advancedTraining.get('hasDirtyAttributes')) {
          advancedTraining.rollbackAttributes();
        }
      });
      this.sendAction('advancedTrainingsEditing');
    }
  }
});
