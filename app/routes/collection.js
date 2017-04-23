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
    let [, modelName] = this.routeName.split('.');
    return this.store.query(singularize(modelName), {
      sort: params.sort,
      filter: {
        text: params.q
      }
    });
  },

  actions: {
    accessDenied() {
      this.transitionTo('index');
    }
  }
});
