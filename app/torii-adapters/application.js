import Ember from 'ember';
import RSVP from 'rsvp';
import config from '../config/environment';

const { get } = Ember;

export default Ember.Object.extend({

  store: Ember.inject.service(),

  fetch() {
    let token = localStorage.getItem('qtc-token');
    if (token == null) {
      return Ember.RSVP.reject();
    }
    return fetch(config.API_HOST + '/user_sessions', {
      headers: {
        'Api-Key': config.API_KEY,
        'Access-Token': localStorage.getItem('qtc-token'),
        'Content-Type': 'application/vnd.api+json'
      }
    }).then((response) => {
      return response.json();
    }).then((json) => {
      return RSVP.all([
        get(this, 'store').find('user', json.data.attributes['user-id']),
        get(this, 'store').query('group', { apiKey: config.API_KEY })
      ])
    }).then(function ([user, groups]) {
      return {
        currentUser: user,
        currentGroup: groups.get('firstObject')
      };
    });
  },

  open(data) {
    return fetch(config.API_HOST + '/user_sessions', {
      method: 'POST',
      headers: {
        'Api-Key': config.API_KEY,
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        provider: data.provider.replace('-oauth2', ''),
        code: data.authorizationCode,
        'redirect-uri': data.redirectUri
      })
    }).then((response) => {
      return response.json();
    }).then((json) => {
      localStorage.setItem('qtc-token', json.data.attributes['access-token']);
      return get(this, 'store').find('user', json.data.attributes['user-id']);
    }).then(function (user) {
      return {
        currentUser: user
      };
    });
  },

  close() {
    return fetch(config.API_HOST + '/user_sessions/' + localStorage.getItem('qtc-token'), {
      method: 'DELETE',
      headers: {
        'Api-Key': config.API_KEY,
        'Access-Token': localStorage.getItem('qtc-token'),
        'Content-Type': 'application/vnd.api+json'
      }
    }).then(function() {
      localStorage.removeItem('qtc-token');
    })
  }
});
