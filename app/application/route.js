import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('group').then(function (groups) {
      return groups.get('firstObject');
    });
  }
});
