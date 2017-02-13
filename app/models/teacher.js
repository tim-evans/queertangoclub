import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  url: attr('string'),
  bio: attr('string'),
  guests: hasMany('guest'),
  photos: hasMany('photo', { inverse: 'teacher' }),
  privates: hasMany('private')
});
