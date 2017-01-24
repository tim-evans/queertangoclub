import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    delete(model) {
      return model.destroyRecord();
    },
    save(model, changes) {
      model.setProperties(changes);
      return model.save();
    },
    query(modelName, filter) {
      return this.store.query(modelName, {
        filter
      });
    }
  }
});
