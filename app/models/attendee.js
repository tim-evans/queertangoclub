import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  paymentMethod: attr('string'),
  paymentAmount: attr('number'),
  paymentCurrency: attr('string'),
  paymentUrl: attr('string'),
  paidAt: attr('date'),
  attended: attr('boolean'),
  session: belongsTo('session'),
  member: belongsTo('member')
});

