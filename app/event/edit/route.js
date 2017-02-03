import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend({

  createLocation: method(),

  createTeacher: method(),

  actions: {
    delete(model) {
      return model.destroyRecord();
    },
    save(model, changes) {
      if (changes.coverPhotos) {
        debugger;
      }
      model.setProperties(changes);
      return model.save();
    },
    query(modelName, filter) {
      return this.store.query(modelName, {
        filter
      });
    },
    createTeacher(session, params) {
      return this.createTeacher(params).then(function (teacher) {
        session.set('teacher', teacher);
      });
    },
    createLocation(session, params) {
      return this.createLocation(params).then(function (location) {
        session.set('location', location);
      });
    }
  }
});
