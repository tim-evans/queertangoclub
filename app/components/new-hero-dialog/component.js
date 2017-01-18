import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['new-hero-dialog'],

  group: computed(function () {
    return {
      name: ''
    };
  }),

  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});

