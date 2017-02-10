import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { get, computed, Map } = Ember;
const { attr, hasMany } = DS;

function groupBy(collectionKey, key) {
  return computed(`${collectionKey}.@each.${key}`, {
    get() {
      let collection = get(this, collectionKey).sortBy(key);
      let group = {};
      collection.forEach(function (item) {
        let value = get(item, key);
        if (group[value] == null) { group[value] = []; }
        group[value].push(item);
      });

      return group;
    }
  });
}

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  startsAt: attr('date'),
  endsAt: attr('date'),
  published: attr('boolean'),
  sessions: hasMany('session'),
  photos: hasMany('photo'),
  discounts: hasMany('discount'),
  eventPhotos: computed('photos.@each.tags', {
    get() {
      return get(this, 'photos').filter(function (photo) {
        return (get(photo, 'tags') || []).indexOf('cover-photo') === -1;
      });
    }
  }),
  coverPhotos: computed('photos.@each.tags', {
    get() {
      return get(this, 'photos').filter(function (photo) {
        return (get(photo, 'tags') || []).indexOf('cover-photo') !== -1;
      });
    }
  }),

  registerable: computed('sessions.@each.registerable', 'published', {
    get() {
      return get(this, 'published') &&
        get(this, 'sessions').isAny('registerable');
    }
  }),

  sessionsByDay: groupBy('sessions', 'startDate')
});
