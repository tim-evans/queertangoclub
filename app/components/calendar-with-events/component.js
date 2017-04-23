import Ember from 'ember';

const { computed, computed: { reads } } = Ember;

export default Ember.Component.extend({
  classNames: ['calendar-with-events'],
  center: reads('events.firstObject.startsAt'),
  hours: computed({
    get() {
      return new Array(24);
    }
  })
});
