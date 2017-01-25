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
  photos: hasMany('photo'),
  sessions: hasMany('session'),
  coverPhotos: hasMany('coverPhoto'),
  registerable: computed('sessions.@each.registerable', 'published', {
    get() {
      return get(this, 'published') &&
        get(this, 'sessions').isAny('registerable');
    }
  }),

  sessionsByDay: groupBy('sessions', 'startsAt')
});
