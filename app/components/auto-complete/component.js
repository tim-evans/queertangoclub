import Ember from 'ember';

const { computed, get, set, guidFor } = Ember;

export default Ember.Component.extend({
  classNames: ['auto-complete'],

  searchId: computed({
    get() {
      return 'search-' + guidFor(this);
    }
  }),

  actions: {
    query(query) {
      if (query === '') {
        get(this, 'popover').hide();
        get(this, 'onchange')(null);
      } else {
        get(this, 'onquery')({ [get(this, 'key')]: query }).then((options) => {
          set(this, 'options', options);
          get(this, 'popover').show();
          get(this, 'popover').retile();
        });
      }
    },

    change(value) {
      get(this, 'popover').hide();
      get(this, 'onchange')(value);
    }
  }

});
