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
  this.route('user', { path: '/users/:user_id' });

  this.route('teachers');
  this.route('teacher', { path: '/teachers/:teacher_id' });

  this.route('locations');
  this.route('location', { path: '/locations/:location_id' });

  this.route('expenses');
  this.route('expense', { path: '/expenses/:expense_id' });

  this.route('privates');
  this.route('private', { path: '/privates/:private_id' });

  this.route('session', { path: '/sessions/:session_id' });

  this.route('group', { path: '/groups/:group_id' }, function () {
    this.route('ledger');
  });
});

export default Router;
