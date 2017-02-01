import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend(Restricted, {

  createLocation: method(),

  queryParams: {
    sort: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('location', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    createLocation(params) {
      return this.createLocation(params).then((location) => {
        this.transitionTo('location', location);
      });
    }
  }
});
