import Collection from '../../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({
  uploadPhoto: method(),
  actions: {
    createEvent(attributes) {
      let event = this.store.createRecord('event', attributes);
      return event.save().then((event) => {
        if (attributes.coverPhoto) {
          return this.uploadPhoto(attributes.coverPhoto, {
            event,
            tags: ['cover-photo']
          });
        }
      }).then(() => {
        this.transitionTo('admin.event', event);
      });
    }
  }
});
