import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    delete(model) {
      return model.destroyRecord();
    },
    save(model, changes) {
      model.setProperties(changes);
      return model.save();
    },
    query(modelName, filter) {
      return this.store.query(modelName, {
        filter
      });
    },
    createTeacher(session, params) {
      params.session = session;
      return this.store.createRecord('teacher', params);
    },
    createLocation(session, params) {
      params.session = session;
      return this.store.createRecord('location', params);
    }
  }
});
