import Ember from 'ember';
import DS from 'ember-data';

const { get, set, computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  name: attr('string'),
  url: attr('string'),
  addressLine: attr('string'),
  extendedAddress: attr('string'),
  city: attr('string'),
  regionCode: attr('string'),
  postalCode: attr('string'),
  latitude: attr('string'),
  longitude: attr('string'),
  slug: attr('string'),
  photo: belongsTo('photo'),
  safeSpace: attr('boolean'),

  address: computed('addressLine', 'extendedAddress', {
    get() {
      return [get(this, 'addressLine'), get(this, 'extendedAddress')].compact().join('\n');
    },
    set(_, value) {
      let [addressLine, ...extendedAddress] = (value || '').split('\n');
      set(this, 'addressLine', addressLine);
      set(this, 'extendedAddress', extendedAddress.length ? extendedAddress.join('\n') : null);
      return value;
    }
  })
});
