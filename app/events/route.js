import Ember from 'ember';
import moment from 'moment';

const { get } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.query('event', {
      include: 'photos',
      sort: 'ends-at'
    }).then(function (events) {
      return events.reduce(function (E, event) {
        if (moment().isBefore(moment(get(event, 'endsAt')))) {
          E.upcoming.push(event);
        } else {
          E.past.unshift(event);
        }
        return E;
      }, { upcoming: [], past: [] });
    });
  }
});
