import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';

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
    return this.store.query('user', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    createUser(params) {
      let user = this.store.createRecord('user', params);
      return user.save().then(() => {
        this.refresh();
      });
    }
  }
});
