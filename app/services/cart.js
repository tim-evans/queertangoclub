import Ember from 'ember';

const { get, inject: { store } } = Ember;

export default Ember.Service.extend({
  store: service(),

  items: computed({
    get() {
      let cart = JSON.parse(localStorage.get('cart') || '[]');
      return get(this, 'store').find(cart);
    },
    set(_, value) {
      localStorage.set('cart', JSON.stringify(value.mapBy('id')));
      return value;
    }
  })
});
