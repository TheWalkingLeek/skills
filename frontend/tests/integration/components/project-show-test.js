import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-show', 'Integration | Component | project show', {
  integration: true
});

test('it renders project', function(assert) {
  this.set('project', {
    title: 'Dreaming Project',
    description: 'Schlafen',
    role: 'Träumer',
    year_from: '1990',
    year_to: '1991',
    projectTechnologies: [
      { offer: ['java', 'ruby', 'ember'] }
    ]
  });

  this.render(hbs`{{project-show
    project=project
    selectProject=(action (mut projectEditing))
  }}`);

  assert.ok(this.$().text().indexOf('Dreaming Project') !== -1);
  assert.ok(this.$().text().indexOf('Schlafen') !== -1);
  assert.ok(this.$().text().indexOf('Träumer') !== -1);
  assert.ok(this.$().text().indexOf('1990') !== -1);
  assert.ok(this.$().text().indexOf('1991') !== -1);
  assert.ok(this.$().text().indexOf('java') !== -1);
  assert.ok(this.$().text().indexOf('ruby') !== -1);
  assert.ok(this.$().text().indexOf('ember') !== -1);
});

skip('project description, role and technology preserves whitespace', function(assert) {
  this.set('activity', {
    description: 'Preserves\nwhitespaces',
    role: 'Träumer',
    year_from: '1990',
    year_to: '1991'
  });

  this.set('project', {
    title: 'Dreaming Project',
    description: 'Schlafen',
    role: 'Träumer',
    technology: 'Bed',
    year_from: '1990',
    year_to: '1991'
  });

  this.render(hbs`{{project-show
    project=project
    selectProject=(action (mut projectEditing))
  }}`);

  let $elements =
    this.$('.project-description,.project-role,.project-technology');

  assert.equal($elements.length, 3);

  $elements.each((i, el) => {
    assert.equal(window.getComputedStyle(el).whiteSpace, 'pre-wrap');
  });
});
