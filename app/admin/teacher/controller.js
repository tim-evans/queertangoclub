import Ember from 'ember';
import RSVP from 'rsvp';

const { computed, get } = Ember;

export default Ember.Controller.extend({
  appearances: computed('model.guests.@each.event', {
    get: async function () {
      let guests = await get(this, 'model.guests');
      let sessions = await RSVP.all(guests.mapBy('session'));
      let events = await RSVP.all(sessions.mapBy('event'));
      return events.compact().uniqBy('id').map(function (event) {
        let roles = guests.filterBy('session.content.event.content', event).mapBy('role').compact().uniq();
        return {
          event,
          roles: roles.join(', ')
        };
      });
    }
  })
});
