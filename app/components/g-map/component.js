import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  classNames: ['google-map'],
  apiKey: config.GOOGLE_MAPS_API_KEY
});
