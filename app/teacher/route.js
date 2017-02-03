import Ember from 'ember';
import RSVP from 'rsvp';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend(Restricted, {

  uploadPhoto: method(),

  actions: {
    save(model, changes) {
      if (changes.photos) {
        model.get('photos').then((photos) => {
          let newIds = changes.photos.mapBy('id');
          let oldIds = photos.mapBy('id');
          let deletedPhotos = photos.filter(function (photo) {
            return newIds.indexOf(photo.get('id')) === -1;
          });
          let newPhotos = changes.photos.filter(function (file) {
            return oldIds.indexOf(file.get('id')) === -1;
          });

          return RSVP.all([
            ...deletedPhotos.invoke('destroyRecord'),
            ...newPhotos.map((file) => this.uploadPhoto(file, { teacher: model }))
          ]);
        });
      }
      let { photos, ...attrs } = changes;
      model.setProperties(attrs);
      return model.save();
    },
    deleteTeacher(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('teachers');
      });
    }
  }
});
