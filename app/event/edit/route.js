import Resource from '../../routes/resource';
import method from 'ember-service-methods/inject';

export default Resource.extend({

  createLocation: method(),

  createTeacher: method(),

  actions: {
    save(model, changes) {
      if (changes.coverPhotos) {
        changes.photos = changes.coverPhotos.map(function (photo) {
          if (photo.blob) {
            photo.data = { tags: ['cover-photo'] };
          }
          return photo;
        });
        delete changes.coverPhotos;
      }

      if (model.constructor.modelName === 'discount') {
        changes.currency = 'USD';
      }

      return this.save(model, changes);
    },
    delete(model) {
      return model.deleteRecord();
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
    },
    addSession(event) {
      let session = this.store.createRecord('session', { event });
      this.store.createRecord('guest', { session });
      return session;
    },
    addGuest(session) {
      return this.store.createRecord('guest', { session });
    },
    addDiscount(event) {
      return this.store.createRecord('discount', { event });
    }
  }
});
