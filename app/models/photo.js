import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  url: attr('string'),
  filesize: attr('number'),
  filename: attr('string'),
  width: attr('number'),
  height: attr('number'),
  event: belongsTo('event'),
  teacher: belongsTo('teacher')
});
