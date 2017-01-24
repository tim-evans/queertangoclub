import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';

export default Ember.Route.extend(Restricted, {
  actions: {
    deleteUser(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('users');
      });
    }
  }
});
