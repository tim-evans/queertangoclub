import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, inject: { service } } = Ember;

export default Ember.Service.extend({

  store: service(),

  uploadPhoto: method(),

  execute(attributes) {
    let expense = get(this, 'store').createRecord('expense', attributes);
    return expense.save().then((expense) => {
      if (attributes.receipt) {
        return this.uploadPhoto(attributes.receipt).then((photo) => {
          expense.set('receipt', photo);
          return expense.save();
        });
      }
      return expense;
    });
  }
});
