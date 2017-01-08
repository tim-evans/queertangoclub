import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  about: attr('string'),
  email: attr('string'),
  events: hasMany('event'),
  locations: hasMany('location')
});
