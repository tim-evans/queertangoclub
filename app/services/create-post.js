import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, inject: { service } } = Ember;

export default Ember.Service.extend({

  store: service(),

  uploadPhoto: method(),

  execute(attributes) {
    let post = get(this, 'store').createRecord('post', attributes);
    return post.save().then((post) => {
      if (attributes.coverPhoto) {
        return this.uploadPhoto(attributes.coverPhoto, {
          post,
          tags: ['cover-photo']
        });
      }
    }).then(function () {
      return post;
    });
  }
});
