import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    registerWith(parent, form) {
      parent.register(form);
    }
  }
}).reopenClass({
  positionalParams: ['fieldName']
});
