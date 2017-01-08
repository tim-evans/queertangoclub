import Ember from 'ember';
import moment from 'moment';

const { get } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll('event', { reload: true }).then(function (events) {
      return events.sortBy('endsAt').reduce(function (E, event) {
        if (moment().isBefore(moment(get(event, 'endsAt')))) {
          E.upcoming.unshift(event);
        } else {
          E.past.unshift(event);
        }
        return E;
      }, { upcoming: [], past: [] });
    });
  },

  actions: {
    addEvent() {

    }
  }
});
