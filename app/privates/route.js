import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    sort: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('private', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  }
});
