import Collection from '../../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({

  createPost: method(),

  actions: {
    createPost(params) {
      return this.createPost(params).then((post) => {
        this.transitionTo('admin.post', post);
      });
    }
  }
});
