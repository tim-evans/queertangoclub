import Collection from '../../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({

  createTransaction: method(),

  model(params) {
    return this.store.query('transaction', {
      sort: params.sort,
      filter: {
        text: params.q
      }
    });
  },

  actions: {
    createTransaction(params) {
      return this.createTransaction(params).then((transaction) => {
        this.transitionTo('admin.transaction', transaction);
      });
    }
  }
});
