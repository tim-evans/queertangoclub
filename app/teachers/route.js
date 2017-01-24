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
    return this.store.query('teacher', {
      sort: params.sort,
      filter: {
        name: params.q
      }
    });
  },

  actions: {
    createTeacher(params) {
      let teacher = this.store.createRecord('teacher', params);
      return teacher.save().then(() => {
        this.refresh();
      });
    }
  }
});
