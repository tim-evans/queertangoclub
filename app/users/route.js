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
