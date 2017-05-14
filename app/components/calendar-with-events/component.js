import Ember from 'ember';

const { computed, computed: { reads } } = Ember;

export default Ember.Component.extend({
  classNames: ['calendar-with-events'],
  center: reads('events.firstObject.startsAt'),
  hours: computed({
    get() {
      let hours = [];
      for (let i = 0; i <= 24; i++) {
        let hour = (i % 12) || 12;
        if (i >= 12) {
          hours.push(`${hour}pm`);
        } else {
          hours.push(`${hour}am`);
        }
      }
      return hours;
    }
  })
});
