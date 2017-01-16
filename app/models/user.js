import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  email: attr('string'),
  avatarUrl: attr('string'),
  lastSignInAt: attr('date'),
  createdAt: attr('date')
});
