import Ember from 'ember';
import Changeset from 'ember-changeset';

const { computed, get } = Ember;

export default Ember.Component.extend({
  tagName: 'form',

  changeset: computed('model', {
    get() {
      return new Changeset(get(this, 'model'));
    }
  }),

  submit(evt) {
    evt.preventDefault();
    let changeset = get(this, 'changeset');
    get(this, 'onsubmit')(get(changeset, '_content'), changeset.get('_changes'));
    return false;
  },

  actions: {
    onchange(model, field, value) {
      model.set(field, value);
    }
  }
}).reopenClass({
  positionalParams: ['model']
});
