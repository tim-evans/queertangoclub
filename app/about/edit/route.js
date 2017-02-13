import Resource from '../../routes/resource';

export default Resource.extend({
  actions: {
    save(model, changes) {
      model.setProperties(changes);
      return model.save().then(() => {
        this.flash('The about page was saved.', {
          timeout: 5000
        });
        this.transitionTo('about');
      });
    }
  }
});
