import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about', function () {
    this.route('edit');
  });
  this.route('events');
  this.route('event', { path: '/events/:event_id' }, function () {
    this.route('edit');
    this.route('ledger');
    this.route('photos');
  });
});

export default Router;
