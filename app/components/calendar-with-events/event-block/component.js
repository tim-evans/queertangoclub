import Ember from 'ember';
import moment from 'moment';

const { computed, get } = Ember;

export default Ember.Component.extend({
  tagName: 'li',

  attributeBindings: ['style'],

  style: computed('event.startsAt', 'event.endsAt', {
    get () {
      let duration = moment.duration(moment(get(this, 'event.endsAt')).diff(moment(get(this, 'event.startsAt')))).asMinutes();
      let startsAt = moment.duration(moment(get(this, 'event.startsAt')).diff(moment(get(this, 'event.startsAt')).startOf('day'))).asMinutes();
      let height = duration;
      let top = startsAt;

      return `top: ${top}px; height: ${height}px`;
    }
  })
});
