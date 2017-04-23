import Ember from 'ember';

const { get, inject: { service } } = Ember;

export default Ember.Helper.extend({
  store: service(),

  compute([modelName, ids]) {
    return (ids || []).map((id) => {
      return get(this, 'store').peekRecord(modelName, id);
    });
  }
});
