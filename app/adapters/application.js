import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { computed } = Ember;

export default DS.JSONAPIAdapter.extend({
  host: config.API_HOST,
  coalesceFindRequests: true,
  headers: computed({
    get() {
      let headers = {
        ApiKey: config.API_KEY
      };
      if (window.localStorage) {
        Object.assign(headers, {
          AccessToken: localStorage.getItem('qtc-token')
        });
      }

      return headers;
    }
  }).volatile()
});
