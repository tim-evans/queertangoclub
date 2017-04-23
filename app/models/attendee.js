import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  attended: attr('boolean'),
  session: belongsTo('session'),
  member: belongsTo('member'),
  transaction: belongsTo('transaction')
});
