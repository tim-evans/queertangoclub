import Ember from 'ember';

const { get } = Ember;
export default Ember.Component.extend({
  actions: {
    registerWith(parent, form) {
      parent.register(form);
    }
  }
}).reopenClass({
  positionalParams: ['fieldName']
});
