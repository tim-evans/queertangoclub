import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend({

  uploadPhoto: method(),

  actions: {
    addPhoto(event, file) {
      return this.uploadPhoto(file, { event });
    },

    deletePhoto(photo) {
      return photo.destroyRecord();
    }
  }
});
