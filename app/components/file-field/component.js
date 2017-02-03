import Ember from 'ember';
import RSVP from 'rsvp';

const { get, set } = Ember;

export default Ember.Component.extend({

  classNames: ['file-field'],

  didReceiveAttrs() {
    let file = get(this, 'value');
    if (file) {
      if (file.then || get(file, 'store')) {
        RSVP.resolve(file).then((photo) => {
          set(this, 'url', get(photo || {}, 'url'));
        });
      } else {
        file.readAsDataURL().then((url) => {
          set(this, 'url', url);
        });
      }
    } else {
      set(this, 'url', null);
    }
  }
});
