import Ember from 'ember';

const { set } = Ember;

export default Ember.Route.extend({
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
