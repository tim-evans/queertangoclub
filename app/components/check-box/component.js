import Ember from 'ember';

const { computed, get, guidFor } = Ember;

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['check-box'],
  inputId: computed({
    get() {
      return `checkbox-${guidFor(this)}`;
    }
  }),

  actions: {
    change(evt) {
      get(this, 'onchange')(evt.target.checked);
    }
  }
});
