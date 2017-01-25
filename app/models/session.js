import Ember from 'ember';
import DS from 'ember-data';

const { get, computed } = Ember;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  startsAt: attr('date'),
  endsAt: attr('date'),
  event: belongsTo('event'),
  location: belongsTo('location'),
  ticketCost: attr('number'),
  ticketCurrency: attr('string'),
  level: attr('string'),
  attendees: hasMany('attendee'),
  guests: hasMany('guest'),
  registerable: computed('ticketCost', 'startsAt', {
    get() {
      return new Date() < get(this, 'startsAt') &&
        isPresent(get(this, 'ticketCost'));
    }
  })
});
