import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend(Restricted, {

  createTeacher: method(),

  queryParams: {
    sort: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('teacher', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    createTeacher(params) {
      return this.createTeacher(params).then((teacher) => {
        this.transitionTo('teacher', teacher);
      });
    }
  }
});
