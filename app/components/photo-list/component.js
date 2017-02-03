import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  actions: {
    add(photo) {
      let photos = get(this, 'value').slice();
      photos.push(photo);
      get(this, 'onchange')(photos);
    },
    change(index, photo) {
      let photos = get(this, 'value').slice();
      if (photo) {
        photos.splice(index, 1, photo);
      } else {
        photos.splice(index, 1);
      }
      get(this, 'onchange')(photos);
    }
  }
});
