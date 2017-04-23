import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, inject: { service } } = Ember;

export default Ember.Service.extend({

  store: service(),

  createTransaction: method(),

  execute({ event, ...attributes }) {
    return this.createTransaction(attributes).then((transaction) => {
      let expense = get(this, 'store').createRecord('expense', {
        event,
        transaction
      });
      return expense.save();
    });
  }
});
