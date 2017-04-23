import Ember from 'ember';

const { get, computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames: ['new-donation-dialog'],

  data: computed({
    get() {
      return {
        paidAt: new Date()
      };
    }
  }),

  actions: {
    submit(model, changes) {
      changes.description = changes.paidBy;
      return get(this, 'onsubmit')(Object.assign(changes, model)).then(get(this, 'dismiss'));
    }
  }
});
