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
    return this.store.query('member', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    createMember(params) {
      return this.store.createRecord('member', params).save().then((member) => {
        this.transitionTo('member', member);
      });
    }
  }
});
