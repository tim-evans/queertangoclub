import Ember from 'ember';
import RSVP from 'rsvp';
import Changeset from 'ember-changeset';
import method from 'ember-service-methods/inject';

const { computed, get, set, tryInvoke } = Ember;

export default Ember.Component.extend({
  tagName: 'form',

  multiple: false,

  novalidate: true,

  flash: method(),

  attributeBindings: ['novalidate'],

  changeset: computed('model', {
    get() {
      return new Changeset(get(this, 'model') || {});
    }
  }),

  submit(evt) {
    if (evt) { evt.preventDefault(); }

    let promises = [];
    let model = get(this, 'model');
    let changeset = get(this, 'changeset');
    let changes = get(this, 'changeset').snapshot().changes;
    let isDirty = changeset.get('isDirty') || model.get('isDeleted');

    if (isDirty && get(model, 'isNew')) {
      return get(this, 'onsubmit')(model, changes).then(() => {
        return RSVP.all(get(this, 'nestedForms').map(function (form) {
          return form.submit(evt);
        }));
      });
    } else {
      promises = get(this, 'nestedForms').map(function (form) {
        return form.submit(evt);
      });
      if (isDirty) {
        promises.push(get(this, 'onsubmit')(model, changes));
      }
    }

    return RSVP.all(promises);
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
    },
    onsubmit() {
      return this.submit().then(() => {
        let model = get(this, 'model');
        this.flash(`"${model.get('name') || model.get('title') || model.get('email')}" was saved.`, {
          timeout: 2500
        });
      });
    }
  }
}).reopenClass({
  positionalParams: ['model']
});
