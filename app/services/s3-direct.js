import method from 'ember-service-methods';
import fetch from 'ember-network/fetch';
import config from '../config/environment';

export default method(function () {
  return fetch(config.API_HOST + '/s3-direct');
});
