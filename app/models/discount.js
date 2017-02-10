import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  event: belongsTo('event'),
  description: attr('string'),
  validUntil: attr('date'),
  fractional: attr('number'),
  currency: attr('string'),
  activeWhen: attr(),
  distributeAmong: attr()
});
