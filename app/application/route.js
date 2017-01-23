import Ember from 'ember';
import Authenticatable from 'torii/routing/application-route-mixin';

export default Ember.Route.extend(Authenticatable, {
  model() {
    return this.store.findAll('group').then(function (groups) {
      return groups.get('firstObject');
    });
  },

  actions: {
    logout() {
      this.session.close();
    }
  }
});
