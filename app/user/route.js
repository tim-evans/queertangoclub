import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteUser(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('users');
      });
    }
  }
});
