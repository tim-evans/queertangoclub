import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    return model.get('sessions');
  }
});
