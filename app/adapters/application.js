import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { computed } = Ember;

export default DS.JSONAPIAdapter.extend({
  host: config.API_HOST,
  headers: computed({
    get() {
      return {
        ApiKey: config.API_KEY,
        AccessToken: localStorage.getItem('qtc-token')
      };
    }
  }).volatile()
});
