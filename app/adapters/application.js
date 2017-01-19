import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.API_HOST,
  headers: {
    ApiKey: config.API_KEY
  }
});
