import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  afterModel(model) {
    return RSVP.all(model.get('sessions').mapBy('guests'));
  }
});
