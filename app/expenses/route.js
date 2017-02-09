import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend(Restricted, {

  createExpense: method(),

  queryParams: {
    sort: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('expense', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    createExpense(params) {
      return this.createExpense(params).then((expense) => {
        this.transitionTo('expense', expense);
      });
    }
  }
});
