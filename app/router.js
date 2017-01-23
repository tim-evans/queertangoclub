import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');

  this.route('about', function () {
    this.route('edit');
  });
  this.route('events');
  this.route('event', { path: '/events/:event_id' }, function () {
    this.route('edit');
    this.route('ledger');
    this.route('photos');
  });

  this.route('members');
  this.route('member', { path: '/members/:member_id' }, function () {
    this.route('edit');
  });

  this.route('users');
  this.route('user', { path: '/users/:user_id' }, function () {
    this.route('edit');
  });

  this.route('session', { path: '/sessions/:session_id' });
});

export default Router;
