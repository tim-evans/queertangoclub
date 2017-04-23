import Ember from 'ember';
import DS from 'ember-data';

const { belongsTo } = DS;

export default DS.Model.extend({
  event: belongsTo('event'),
  transaction: belongsTo('transaction')
});
