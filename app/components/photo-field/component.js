import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  classNames: ['photo-field'],

  actions: {
    removePhoto(evt) {
      get(this, 'onchange')(null);
      evt.preventDefault();
      return false;
    }
  }
});
