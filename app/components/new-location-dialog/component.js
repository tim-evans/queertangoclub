import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  classNames: ['new-location-dialog'],
  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});

