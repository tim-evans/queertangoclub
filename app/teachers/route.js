import Collection from '../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({

  createTeacher: method(),

  actions: {
    createTeacher(params) {
      return this.createTeacher(params).then((teacher) => {
        this.transitionTo('teacher', teacher);
      });
    }
  }
});
