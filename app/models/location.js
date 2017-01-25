import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  url: attr('string'),
  addressLine: attr('string'),
  extendedAddress: attr('string'),
  city: attr('string'),
  regionCode: attr('string'),
  postalCode: attr('string'),
  imageUrl: attr('string'),
  latitude: attr('string'),
  longitude: attr('string'),
  category: attr('string'),
  slug: attr('string'),
  safeSpace: attr('boolean')
});
