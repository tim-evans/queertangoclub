import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';

const { computed, get } = Ember;
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

  modelName: computed({
    get() {
      let [, modelName] = this.routeName.split('.');
      return singularize(modelName);
    }
  }),

  query (params) {
    return this.store.query(get(this, 'modelName'), {
      sort: params.sort,
      page: {
        limit: 50,
        offset: params.offset
      },
      filter: {
        text: params.q
      }
    }).then(function (results) {
      return {
        model: results,
        meta: get(results, 'meta')
      };
    });
  },

  model(params) {
    return this.query(params);
  },

  actions: {
    accessDenied() {
      this.transitionTo('index');
    },

    load(offset) {
      return this.query({
        offset,
        sort: get(this.controller, 'sort'),
        q: get(this.controller, 'q')
      });
    }
  }
});
