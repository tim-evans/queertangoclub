import Ember from 'ember';

const { set } = Ember;

export default Ember.Route.extend({
  actions: {
    changePhoto(model, image) {
      image.readAsDataURL().then(function (url) {
        set(model, 'hero', url);
      });
    }
  }
});
