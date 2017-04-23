import Collection from '../../routes/collection';
import method from 'ember-service-methods/inject';

export default Collection.extend({

  flash: method(),

  actions: {
    createUser(params) {
      let user = this.store.createRecord('user', params);
      return user.save().then((user) => {
        let loginUrl = window.location.host + '/login';
        this.flash(`"${user.get('email')}" has access.<br>They can login at <a href="http://${loginUrl}">${loginUrl}</a>.`, {
          timeout: 5000
        });
        this.refresh();
      });
    }
  }
});
