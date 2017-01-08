import DS from 'ember-data';

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
  maxAttendees: attr('number'),
  level: attr('string'),
  attendees: hasMany('attendee'),
  guests: hasMany('guest')
});
