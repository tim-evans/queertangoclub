import Ember from 'ember';
import Changeset from 'ember-changeset';

const { computed, get, set, tryInvoke } = Ember;

export default Ember.Component.extend({
  tagName: 'form',

  changeset: computed('model', {
    get() {
      return new Changeset(get(this, 'model') || {});
    }
  }),

  submit(evt) {
    evt.preventDefault();
    get(this, 'nestedForms').forEach(function (form) {
      form.submit(evt);
    });

    let changeset = get(this, 'changeset');
    if (changeset.get('isDirty')) {
      get(this, 'onsubmit')(get(changeset, '_content'), changeset.get('_changes'));
    }
    return false;
  },

  init() {
    this._super(...arguments);
    set(this, 'nestedForms', []);
    tryInvoke(this, 'oninit', [this]);
  },

  register(form) {
    get(this, 'nestedForms').push(form);
  },

  actions: {
    onchange(model, field, value) {
      model.set(field, value);
    }
  }
}).reopenClass({
  positionalParams: ['model']
});
