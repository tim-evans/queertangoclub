import DS from 'ember-data';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  apiKey: attr('string'),
  about: attr('string'),
  email: attr('string'),
  hostname: attr('string'),
  events: hasMany('event'),
  locations: hasMany('location'),
  hero: belongsTo('photo')
});
