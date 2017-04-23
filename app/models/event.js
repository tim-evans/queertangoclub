import Ember from 'ember';
import RSVP from 'rsvp';
import DS from 'ember-data';
import { formatDateRange } from '../helpers/format-date-range';

const { get, computed, String: { dasherize } } = Ember;
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
  photos: hasMany('photo', {
    inverse: 'event'
  }),
  discounts: hasMany('discount'),
  eventPhotos: computed('photos.@each.tags', {
    get() {
      return get(this, 'photos').then((photos) => {
        return photos.filter(function (photo) {
          return (get(photo, 'tags') || []).indexOf('cover-photo') === -1;
        });
      });
    }
  }),
  coverPhotos: computed('photos.@each.tags', {
    get() {
      return get(this, 'photos').then((photos) => {
        return photos.filter(function (photo) {
          return (get(photo, 'tags') || []).indexOf('cover-photo') !== -1;
        });
      });
    }
  }),

  dateRange: computed('startsAt', 'endsAt', {
    get() {
      return formatDateRange(get(this, 'startsAt'),
                             get(this, 'endsAt'));
    }
  }),

  registerable: computed('sessions.@each.registerable', 'published', {
    get() {
      return get(this, 'published') &&
        get(this, 'sessions').isAny('registerable');
    }
  }),

  sessionsByDay: groupBy('sessions', 'startDate'),

  uniqueGuests: computed('sessions.@each.guests', {
    get() {
      return get(this, 'sessions').then(function (sessions) {
        return RSVP.all(sessions.mapBy('guests'));
      }).then(function (list) {
        let guests = list.reduce(function (E, guests) {
          return E.concat(guests.toArray());
        }, []);

        return Object.values(guests.reduce(function (E, guest) {
          if (get(guest, 'credited')) {
            let teacher = get(guest, 'teacher');
            let aggregate = E[get(teacher, 'id')];
            if (aggregate == null) {
              aggregate = E[get(teacher, 'id')] = {
                roles: [get(guest, 'role')],
                teacher
              };
            } else {
              aggregate.roles.push(get(guest, 'role'));
            }
          }
          return E;
        }, {})).map(function (guest) {
          guest.roles = guest.roles.uniq();
          return guest;
        });
      });
    }
  })

});
