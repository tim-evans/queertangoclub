import Ember from 'ember';
import Resource from '../routes/resource';
import method from 'ember-service-methods/inject';

const { get, set, isBlank } = Ember;

export default Resource.extend({

  getLocationFromPostalCode: method(),

  actions: {
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
