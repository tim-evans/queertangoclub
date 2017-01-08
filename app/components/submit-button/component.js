import Ember from 'ember';
import RSVP from 'rsvp';
import { task, timeout } from 'ember-concurrency';

const { get, set } = Ember;

export default Ember.Component.extend({
  tagName: 'button',

  submit: task(function *(submit) {
    set(this, 'isProcessing', true);
    yield RSVP.race([submit(), timeout(500)]);
    set(this, 'isProcessing', false);
    yield timeout(500);
  }),

  click(evt) {
    evt.preventDefault();
    get(this, 'submit').perform(get(this, 'onsubmit'));
    return false;
  }
});
