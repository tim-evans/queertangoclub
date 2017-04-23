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
        get(this, 'onquery')({ text: query }).then((options) => {
          set(this, 'options', options);
          if (get(options, 'length')) {
            get(this, 'popover').show();
            get(this, 'popover').retile();
          } else {
            get(this, 'popover').hide();
          }
        });
      }
    },

    change(value) {
      get(this, 'popover').hide();
      get(this, 'onchange')(value);
    }
  }

});
