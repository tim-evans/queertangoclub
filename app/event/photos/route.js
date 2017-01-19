import Ember from 'ember';
import RSVP from 'rsvp';
import method from 'ember-service-methods/inject';

function getDimensions(src) {
  return new RSVP.Promise(function (resolve) {
    let img = new Image();
    img.onload = function () {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = src;
  });
}

export default Ember.Route.extend({

  s3Direct: method(),

  actions: {
    addPhoto(event, file) {
      let photo = this.store.createRecord('photo', {
        event,
        filesize: file.get('size'),
        filename: file.get('name'),
        file
      });

      return RSVP.all([
        file.readAsDataURL().then(function (url) {
          photo.set('url', url);
          return getDimensions(url);
        }),
        this.s3Direct().then(function (response) {
          return response.json();
        }).then(function ({ url, credentials }) {
          return file.upload(url, {
            data: credentials
          });
        })
      ]).then(function ([{ width, height }, response]) {
        photo.setProperties({
          width,
          height,
          file: null,
          url: response.headers.Location
        });
        return photo.save();
      });
    },

    deletePhoto(photo) {
      return photo.destroyRecord();
    }
  }
});
