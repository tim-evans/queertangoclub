import Ember from 'ember';

const { get, computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames: ['new-expense-dialog'],

  session: service(),

  data: computed({
    get() {
      return {
        expensedAt: new Date(),
        expensedBy: get(this, 'session.currentUser.name')
      };
    }
  }),

  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(Object.assign(changes, model)).then(get(this, 'dismiss'));
    }
  }
});

