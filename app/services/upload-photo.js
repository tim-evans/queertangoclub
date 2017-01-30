import Ember from 'ember';
import RSVP from 'rsvp';
import fetch from 'ember-network/fetch';
import config from '../config/environment';

const { inject: { service } } = Ember;

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

export default Ember.Service.extend({
  store: service(),

  execute(file, options={}) {
    let photo = this.get('store').createRecord('photo', Object.assign({
      filesize: file.get('size'),
      filename: file.get('name'),
      file
    }, options));

    return RSVP.all([
      file.readAsDataURL().then(function (url) {
        photo.set('url', url);
        return getDimensions(url);
      }),
      fetch(config.API_HOST + '/s3-direct', {
        headers: {
          'Api-Key': config.API_KEY,
          'Access-Token': localStorage.getItem('qtc-token')
        }
      }).then(function (response) {
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
  }
});
