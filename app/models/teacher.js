import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  url: attr('string'),
  bio: attr('text'),
  guests: hasMany('guest'),
  photos: hasMany('photo'),
  privates: hasMany('private')
});
