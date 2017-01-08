import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  role: attr('string'),
  event: belongsTo('event')
});
