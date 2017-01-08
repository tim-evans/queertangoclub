import Ember from 'ember';

const { get, set, copy, guidFor, inject: { service } } = Ember;

const OpenGraph = Ember.Object.extend({
  init(...args) {
    this._super(...args);
    set(this, 'items', Ember.A());
  },

  push(item) {
    let itemForId = this.items.findBy('id', item.id);
    let items = copy(this.items);

    if (itemForId) {
      let index = this.items.indexOf(itemForId);
      items.splice(index, 1, item);
    } else {
      items.push(item);
    }

    set(this, 'items', Ember.A(items));
  },

  remove(id) {
    let item = this.items.findBy('id', id);
    let items = Ember.A(copy(this.items));
    items.removeObject(item);
    set(this, 'items', Ember.A(items));
  }
});

export default Ember.Helper.extend({
  headData: service(),

  init(...args) {
    this._super(...args);
    let og = get(this, 'headData.openGraph');
    if (og == null) {
      og = OpenGraph.create();
      set(this, 'headData.openGraph', og);
    }
    og.push({ id: guidFor(this) });
  },

  compute([key, value]) {
    let og = get(this, 'headData.openGraph');
    og.push({ key, value, id: guidFor(this) });
    return '';
  },

  destroy() {
    get(this, 'headData.openGraph').remove(guidFor(this));
  }
});
