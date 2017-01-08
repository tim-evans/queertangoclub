import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  url: attr('string'),
  event: belongsTo('event')
});
