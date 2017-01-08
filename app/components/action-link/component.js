import Ember from 'ember';

const { get } = Ember;
export default Ember.Component.extend({
  tagName: 'a',
  tabindex: 0,
  attributeBindings: ['tabindex'],
  disabled: false,
  click(evt) {
    evt.preventDefault();
    if (!get(this, 'disabled')) {
      get(this, 'action')();
    }
    return false;
  }
}).reopenClass({
  positionalParams: ['action']
});
