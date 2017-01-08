import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  startsAt: attr('date'),
  endsAt: attr('date'),
  published: attr('boolean'),
  photos: hasMany('photo'),
  sessions: hasMany('session'),
  coverPhotos: hasMany('coverPhoto')
});
