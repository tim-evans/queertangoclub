import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  role: attr('string'),
  session: belongsTo('session'),
  teacher: belongsTo('teacher')
});
