import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  currentHostname: computed({
    get() {
      return window.location.host;
    }
  })
});
