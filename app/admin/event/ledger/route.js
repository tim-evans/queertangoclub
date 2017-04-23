import Collection from '../../../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({

  createExpense: method(),

  model() {
    return this.modelFor('admin.event');
  },

  actions: {
    createExpense(params) {
      params.event = this.modelFor('admin.event');
      return this.createExpense(params).then((expense) => {
        this.refresh();
      });
    }
  }
});
