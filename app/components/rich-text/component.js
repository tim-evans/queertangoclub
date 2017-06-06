import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({
  tagName: '',
  mobiledoc: computed('value', {
    get() {
      return JSON.parse(get(this, 'value'));
    }
  })
}).reopenClass({
  positionalParams: ['value']
});
