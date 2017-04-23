import Ember from 'ember';
import RSVP from 'rsvp';

const { get, set } = Ember;

export default Ember.Component.extend({
  classNames: ['photo-field'],
  classNameBindings: ['photo:present'],

  multiple: false,

  didReceiveAttrs() {
    let file = get(this, 'value');
    if (file) {
      if (file.then || get(file, 'store')) {
        RSVP.resolve(file).then((photo) => {
          if (photo) {
            set(this, 'photo', {
              url: get(photo, 'url'),
              name: get(photo, 'filename')
            });
          } else {
            set(this, 'photo', null);
          }
        });
      } else {
        set(this, 'isLoading', true);
        file.readAsDataURL().then((url) => {
          set(this, 'isLoading', false);
          set(this, 'photo', {
            url,
            name: get(file, 'name')
          });
        });
      }
    } else {
      set(this, 'photo', null);
    }
  },

  actions: {
    removePhoto(evt) {
      get(this, 'onchange')( null);
      evt.preventDefault();
      return false;
    }
  }
});
