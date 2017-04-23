import Collection from '../../routes/collection';

export default Collection.extend({
  actions: {
    query(modelName, filter) {
      return this.store.query(modelName, {
        filter
      });
    },
    createPrivate(attributes) {
      let privateClass = this.store.createRecord('private', attributes);
      return privateClass.save().then((privateClass) => {
        this.transitionTo('admin.private', privateClass);
      });
    }
  }
});
