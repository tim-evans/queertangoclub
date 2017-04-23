import Ember from 'ember';

const { computed, get, tryInvoke } = Ember;
const { dasherize, capitalize } = Ember.String;

export default Ember.Component.extend({

  classNames: ['form-for_field'],

  classNameBindings: ['autocomplete:has-autocompletion'],

  min: Number.MIN_SAFE_INTEGER,

  max: Number.MAX_SAFE_INTEGER,

  inputId: computed('fieldName', 'model', 'index', {
    get() {
      return [
        get(this, 'modelName'),
        get(this, 'index'),
        dasherize(get(this, 'fieldName') || '')
      ].compact().join('_');
    }
  }),

  modelName: computed('model', {
    get() {
      return get(this, 'model._content.constructor.modelName');
    }
  }),

  label: computed('fieldName', {
    get() {
      return dasherize(get(this, 'fieldName') || '').split('-').map(capitalize).join(' ');
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
