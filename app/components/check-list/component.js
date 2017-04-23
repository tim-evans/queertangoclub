import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({

  classNames: ['check-list'],

  readonly: false,

  actions: {
    toggle (item) {
      if (get(this, 'readonly')) { return; }

      if (typeof item === 'string' &&
          item.match(/^\d+$/g)) {
        item = parseInt(item, 10);
      }

      let value = (get(this, 'value') || []).slice();
      if (value.indexOf(item) === -1) {
        value.push(item);
      } else {
        value.removeObject(item);
      }
      get(this, 'onchange')(value);
    }
  }
});
