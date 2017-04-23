import Ember from 'ember';

const { get, computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames: ['tinyletter-dialog'],

  actions: {
    submit(_, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});
