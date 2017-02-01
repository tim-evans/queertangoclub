import Ember from 'ember';
import RSVP from 'rsvp';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend(Restricted, {

  uploadPhoto: method(),

  actions: {
    save(model, changes) {
      return model.get('photo').then((oldPhoto) => {
        if (changes.photo) {
          let photos = [this.uploadPhoto(changes.photo)];
          if (oldPhoto) {
            photos.push(oldPhoto.destroyRecord());
          }
          return RSVP.all(photos);
        }
        return [];
      }).then(function ([photo]) {
        model.setProperties(changes);
        if (photo) {
          model.set('photo', photo);
        }
        return model.save();
      });
    },
    deleteLocation(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('locations');
      });
    }
  }
});
