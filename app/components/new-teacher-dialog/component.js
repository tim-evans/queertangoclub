import Ember from 'ember';
import RSVP from 'rsvp';

const { get } = Ember;

export default Ember.Component.extend({
  classNames: ['new-teacher-dialog'],

  actions: {
    submit(model, changes) {
      return RSVP.resolve(get(this, 'onsubmit')(changes)).then(get(this, 'dismiss'));
    }
  }
});

