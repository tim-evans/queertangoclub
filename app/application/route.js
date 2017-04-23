import Ember from 'ember';
import Authenticatable from 'torii/routing/application-route-mixin';
import config from '../config/environment';
import method from 'ember-service-methods/inject';
import { wait } from '../helpers/wait';

export default Ember.Route.extend(Authenticatable, {

  flash: method(),

  beforeModel(transition) {
    return this.store.query('group', { apiKey: config.API_KEY }).then(function (groups) {
      return groups.get('firstObject');
    }).then(() => {
      return this.checkLogin(transition);
    });
  },

  model() {
    let model = this.store.peekAll('group').get('firstObject');
    model.twitter = 'queertangoclub';
    model.facebook = 'nycqueertangoclub';
    return model;
  },

  actions: {
    query(modelName, filter) {
      return this.store.query(modelName, {
        filter
      });
    },
    logout() {
      return this.session.close().then(() => {
        return wait('250ms');
      }).then(() => {
        let owner = Ember.getOwner(this);
        let routes = this.router.currentRouteName.split('.');
        let route = routes.shift();
        do {
          owner.lookup(`route:${route}`).refresh();
          route += `/${routes.shift()}`;
        } while (routes.length > 0);
        this.flash('Logged out successfully.', {
          timeout: 5000
        });
      });
    }
  }
});
