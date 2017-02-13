import Collection from '../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({

  createExpense: method(),

  actions: {
    createExpense(params) {
      return this.createExpense(params).then((expense) => {
        this.transitionTo('expense', expense);
      });
    }
  }
});
