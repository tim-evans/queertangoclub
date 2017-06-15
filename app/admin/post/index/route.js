import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend({

  uploadPhoto: method(),

  actions: {
    addPhoto(model, file) {
      return this.uploadPhoto(file, {
        post: model
      });
    }
  }
});
