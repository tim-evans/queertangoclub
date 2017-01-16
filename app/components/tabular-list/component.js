import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({
  sortBy: computed('sort', {
    get() {
      return (get(this, 'sort') || '').replace(/^-/, '');
    }
  }),

  direction: computed('sort', {
    get() {
      return (get(this, 'sort') || '').indexOf('-') === 0 ? 'desc' : 'asc';
    }
  }),

  columns: computed({
    get() {
      return [];
    },
    set(_, columns) {
      return columns.split(' ');
    }
  })
});
