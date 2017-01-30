import Ember from 'ember';
import moment from 'moment';
import method from 'ember-service-methods/inject';

const { get } = Ember;

export default Ember.Route.extend({

  uploadPhoto: method(),

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
    addEvent(attributes) {
      let event = this.store.createRecord('event', attributes);
      return event.save().then((event) => {
        return this.uploadPhoto(attributes.coverPhoto, {
          event,
          tags: ['cover-photo']
        });
      }).then(() => {
        this.transitionTo('event.edit', event);
      });
    }
  }
});
