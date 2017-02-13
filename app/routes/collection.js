import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';

const { singularize } = Ember.String;

export default Ember.Route.extend(Restricted, {

  queryParams: {
    sort: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query(singularize(this.routeName), {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    accessDenied() {
      this.transitionTo('index');
    }
  }
});
