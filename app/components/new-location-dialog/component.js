import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});

