import Ember from 'ember';
import DS from 'ember-data';

const { get, set, computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  event: belongsTo('event'),
  description: attr('string'),
  validUntil: attr('date'),
  fractional: attr('number'),
  currency: attr('string'),
  activeWhen: attr(),
  distributeAmong: attr(),
  discount: computed('fractional', {
    get() {
      if (get(this, 'fractional')) {
        return get(this, 'fractional') * -1;
      }
      return null;
    },
    set(_, value) {
      if (value != null) {
        set(this, 'fractional', value * -1);
      } else {
        set(this, 'fractional', null);
      }
      return value;
    }
  })
});
