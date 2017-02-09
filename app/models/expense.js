import Ember from 'ember';
import DS from 'ember-data';
import { l } from '../helpers/l';

const { computed, get } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  expensedAt: attr('date'),
  event: belongsTo('event'),
  receipt: belongsTo('photo'),
  amount: attr('number'),
  currency: attr('string', {
    defaultValue: 'USD'
  }),
  expensedBy: attr('string'),

  expense: computed('amount', 'currency', {
    get() {
      return l('currency', get(this, 'amount') / 100, {
        precision: 2
      });
    }
  })
});
