import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    avatarUrl: { serialize: false },
    createdAt: { serialize: false }
  }
});
