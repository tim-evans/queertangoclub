import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  actions: {
    signInViaFacebook() {
      get(this, 'session').open('facebook-connect').then(() => {
//        this.transitionTo('index');
      });
    }
  }
});
