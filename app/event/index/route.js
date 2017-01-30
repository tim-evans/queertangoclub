import Ember from 'ember';
import RSVP from 'rsvp';

const { set } = Ember;

export default Ember.Route.extend({
  afterModel(model) {
    return RSVP.all(model.get('sessions').mapBy('guests'));
  },

  actions: {
    publish(model) {
      set(model, 'published', true);
      return model.save();
    },
    unpublish(model) {
      set(model, 'published', false);
      return model.save();
    }
  }
});
