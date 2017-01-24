import Ember from 'ember';

const { computed, get, tryInvoke } = Ember;
const { dasherize, capitalize } = Ember.String;

export default Ember.Component.extend({
  inputId: computed('fieldName', 'model', 'index', {
    get() {
      return [
        get(this, 'model._content.constructor.modelName'),
        get(this, 'index'),
        dasherize(get(this, 'fieldName'))
      ].compact().join('_');
    }
  }),
  label: computed('fieldName', {
    get() {
      return dasherize(get(this, 'fieldName')).split('-').map(capitalize).join(' ');
    }
  }),

  actions: {
    query(...args) {
      return tryInvoke(this, 'onquery', args);
    }
  }
}).reopenClass({
  positionalParams: ['fieldName']
});
