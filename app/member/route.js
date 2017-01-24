import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';

export default Ember.Route.extend(Restricted, {
  actions: {
    deleteMember(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('members');
      });
    }
  }
});
