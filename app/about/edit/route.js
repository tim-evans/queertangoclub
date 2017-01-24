import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';

export default Ember.Route.extend(Restricted, {
  actions: {
    save(model, changes) {
      model.setProperties(changes);
      return model.save().then(() => {
        this.transitionTo('about');
      });
    }
  }
});
