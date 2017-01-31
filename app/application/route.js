import Ember from 'ember';
import Authenticatable from 'torii/routing/application-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(Authenticatable, {
  model() {
    return this.store.query('group', { apiKey: config.API_KEY }).then(function (groups) {
      return groups.get('firstObject');
    });
  },

  actions: {
    logout() {
      return this.session.close().then(() => {
        let owner = Ember.getOwner(this);
        let routes = this.router.currentRouteName.split('.');
        let route = routes.shift();
        do {
          owner.lookup(`route:${route}`).refresh();
          route += `/${routes.shift()}`;
        } while (routes.length > 0);
      });
    }
  }
});
