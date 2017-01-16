import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  user: computed(function () {
    return {
      email: ''
    };
  }),

  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});

