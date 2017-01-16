import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({
  modelName: computed('model', {
    get() {
      return get(this, 'model.constructor.modelName');
    }
  }),

  actions: {
    submit() {
      return get(this, 'onsubmit')().then(get(this, 'dismiss'));
    }
  }
});
