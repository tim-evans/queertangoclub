import Ember from 'ember';
import Collection from '../../../routes/collection';
import method from 'ember-service-methods/inject';

const { get } = Ember;

export default Collection.extend({

  createExpense: method(),

  modelName: 'transaction',

  query (params) {
    return this.store.query(get(this, 'modelName'), {
      sort: params.sort,
      page: {
        limit: 50,
        offset: params.offset
      },
      filter: {
        event: this.modelFor('admin.event').get('id'),
        text: params.q
      }
    }).then((results) => {
      return {
        event: this.modelFor('admin.event'),
        model: results,
        meta: get(results, 'meta')
      };
    });
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
