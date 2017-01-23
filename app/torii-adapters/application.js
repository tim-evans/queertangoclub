import Ember from 'ember';
import config from '../config/environment';

const { get } = Ember;

export default Ember.Object.extend({

  store: Ember.inject.service(),

  fetch() {
    return fetch(config.API_HOST + '/users/login', {
      method: 'POST',
      headers: {
        'Api-Key': config.API_KEY
      },
      body: JSON.stringify({
        uid: localStorage.getItem('qtc-uid'),
        token: localStorage.getItem('qtc-token')
      })
    }).then((response) => {
      return response.json();
    }).then((json) => {
      // Hack for Ember Data
      json.data.type = 'user';

      let user = get(this, 'store').push(json);
      return {
        currentUser: user
      };
    });
  },

  open(data) {
    localStorage.setItem('qtc-uid', data.userId);
    localStorage.setItem('qtc-token', data.accessToken);
    return this.fetch();
  },

  close() {
    localStorage.removeItem('qtc-uid');
    localStorage.removeItem('qtc-token');
  }
});
