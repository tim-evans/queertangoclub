import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend({

  uploadPhoto: method(),

  actions: {
    save(photo, changes) {
      if (changes == null) {
        return photo.destroyRecord();
      } else {
        photo.setProperties(changes);
      }
      return photo.save();
    },

    addPhoto(event, file) {
      return this.uploadPhoto(file, { event });
    },

    deletePhoto(photo) {
      return photo.destroyRecord();
    }
  }
});
