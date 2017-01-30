import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  actions: {
    loginViaFacebook() {
      get(this, 'session').open('facebook-oauth2').then(() => {
//        this.transitionTo('index');
      });
    },
    loginViaGoogle() {
      get(this, 'session').open('google-oauth2').then(() => {
//        this.transitionTo('index');
      });
    }
  }
});
