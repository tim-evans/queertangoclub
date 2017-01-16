import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  location: computed(function () {
    return {
      name: '',
      url: '',
      addressLine: '',
      extendedAddress: '',
      city: '',
      regionCode: '',
      postalCode: ''
    };
  }),

  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});

