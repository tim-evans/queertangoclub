import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, inject: { service } } = Ember;

export default Ember.Service.extend({

  store: service(),

  uploadPhoto: method(),

  execute(attributes) {
    let location = get(this, 'store').createRecord('location', attributes);
    return location.save().then((location) => {
      if (attributes.photo) {
        return this.uploadPhoto(attributes.photo).then((photo) => {
          location.set('photo', photo);
          return location.save();
        });
      }
      return location;
    });
  }
});
