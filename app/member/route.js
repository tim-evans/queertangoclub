import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteMember(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('members');
      });
    }
  }
});
