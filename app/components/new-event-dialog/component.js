import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['new-event-dialog'],
  event: computed(function () {
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

