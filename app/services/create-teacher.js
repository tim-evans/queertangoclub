import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, inject: { service } } = Ember;

export default Ember.Service.extend({

  store: service(),

  uploadPhoto: method(),

  execute(attributes) {
    let teacher = get(this, 'store').createRecord('teacher', attributes);
    return teacher.save().then((teacher) => {
      return this.uploadPhoto(attributes.photo, { teacher });
    }).then(function () {
      return teacher;
    });
  }
});
