import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:3000/api',
  headers: {
    ApiKey: config.API_KEY
  }
});
