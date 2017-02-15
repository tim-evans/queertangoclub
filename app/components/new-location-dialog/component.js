import Ember from 'ember';
import method from 'ember-service-methods/inject';

const { get, set, isBlank } = Ember;

export default Ember.Component.extend({
  classNames: ['new-location-dialog'],

  getLocationFromPostalCode: method(),

  actions: {
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    },

    hydrateLocation({ changeset }) {
      if (!isBlank(get(changeset, 'postalCode'))) {
        this.getLocationFromPostalCode(get(changeset, 'postalCode')).then(function (data) {
          if (get(changeset, 'city') !== data.city ||
              get(changeset, 'regionCode') !== data.state) {
            set(changeset, 'city', data.city);
            set(changeset, 'regionCode', data.state);
          }
        }, function () {});
      }
    }
  }
});

