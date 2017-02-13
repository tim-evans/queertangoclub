import Ember from 'ember';

const { computed, get, set, String: { htmlSafe }, run: { later } } = Ember;

export default Ember.Component.extend({
  classNames: ['progress-bar'],

  didReceiveAttrs() {
    if (get(this, 'progress') > 0 &&
        get(this, 'value') === 0) {
      later(() => {
        if (this.isDestroyed) { return; }
        set(this, 'progress', 0);
      }, 1000);
    } else {
      set(this, 'progress', get(this, 'value'));
    }
  },

  style: computed('progress', function () {
    return htmlSafe(`width: ${get(this, 'progress')}%`);
  })
});
