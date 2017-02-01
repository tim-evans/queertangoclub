import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    latitude: { serialize: false },
    longitude: { serialize: false },
    slug: { serialize: false }
  }
});
