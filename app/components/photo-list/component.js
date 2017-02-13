import Ember from 'ember';
import RSVP from 'rsvp';

const { get } = Ember;

export default Ember.Component.extend({

  didReceiveAttrs() {
    RSVP.resolve(get(this, 'value')).then((photos) => {
      photos = photos || [];
      this._photos = photos.slice();
    });
  },

  actions: {
    add(photo) {
      let photos = this._photos;
      photos.push(photo);
      get(this, 'onchange')(photos);
    },
    change(index, photo) {
      let photos = this._photos.slice();
      if (photo) {
        photos.splice(index, 1, photo);
      } else {
        photos.splice(index, 1);
      }
      get(this, 'onchange')(photos);
    }
  }
});
