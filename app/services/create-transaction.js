import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, inject: { service } } = Ember;

export default Ember.Service.extend({

  store: service(),

  uploadPhoto: method(),

  execute(attributes) {
    let transaction = get(this, 'store').createRecord('transaction', attributes);
    return transaction.save().then((transaction) => {
      if (attributes.receipt) {
        return this.uploadPhoto(attributes.receipt).then((photo) => {
          transaction.set('receipt', photo);
          return transaction.save();
        });
      }
      return transaction;
    });
  }
});
