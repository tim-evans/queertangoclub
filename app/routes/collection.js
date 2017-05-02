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

  model(params) {
    return this.store.query(get(this, 'modelName'), {
      sort: params.sort,
      page: {
        limit: 50
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

  actions: {
    accessDenied() {
      this.transitionTo('index');
    },

    load(offset) {
      return this.store.query(get(this, 'modelName'), {
        sort: get(this.controller, 'sort'),
        page: {
          limit: 50,
          offset,
        },
        filter: {
          text: get(this.controller, 'q')
        }
      }).then(function (results) {
        return {
          model: results,
          meta: get(results, 'meta')
        };
      });
    }
  }
});
