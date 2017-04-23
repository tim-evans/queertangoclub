import Ember from 'ember';
import DS from 'ember-data';
import { l } from '../helpers/l';

const { computed, get } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  description: attr('string'),
  paidAt: attr('date'),
  paidBy: attr('string'),
  receipt: belongsTo('photo'),
  method: attr('string', { defaultValue: 'cash' }),
  url: attr('string'),
  iou: attr('number'),
  amount: attr('number'),
  currency: attr('string', {
    defaultValue: 'USD'
  }),
  notes: attr('string'),

  paid: computed({
    get() {
      return {
        value: get(this, 'amount'),
        currency: get(this, 'currency')
      };
    }
  }),

  owed: computed({
    get() {
      return {
        value: get(this, 'iou'),
        currency: get(this, 'currency')
      };
    }
  })

});
