import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  email: attr('string'),
  paymentAmount: attr('number'),
  paymentMethod: attr('boolean'),
  stripeToken: attr('string'),
  sessions: hasMany('session')
});
