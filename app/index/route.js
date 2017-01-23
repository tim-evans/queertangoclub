import Ember from 'ember';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend({

  uploadPhoto: method(),

  afterModel(model) {
    return model.get('hero');
  },

  actions: {
    changeHero(model, image) {
      return this.uploadPhoto(image).then((photo) => {
        this.currentModel.set('hero', photo);
        return this.currentModel.save();
      });
    }
  }
});
