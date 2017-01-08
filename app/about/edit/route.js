import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(model, changes) {
      model.setProperties(changes);
      return model.save().then(() => {
        this.transitionTo('about');
      });
    }
  }
});
