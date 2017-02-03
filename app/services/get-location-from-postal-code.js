import fetch from 'ember-network/fetch';
import method from 'ember-service-methods';
import config from '../config/environment';

export default method(function (postalCode) {
  return fetch(`https://www.zipcodeapi.com/rest/${config.ZIP_API_KEY}/info.json/${postalCode}/radians`)
               .then(function (response) {
                 return response.json();
               });
});
