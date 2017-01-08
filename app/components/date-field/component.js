import Ember from 'ember';
import moment from 'moment';

const { computed, get, guidFor } = Ember;

export default Ember.Component.extend({
  classNames: ['date-field'],
  inputId: computed({
    get() {
      return `calendar-${guidFor(this)}`;
    }
  }),

  displayValue: computed('value', {
    get() {
      let value = get(this, 'value');
      return value ? moment(value).format('MM/DD/YYYY') : '';
    }
  }),

  actions: {
    onchange(day) {
      get(this, 'onchange')(get(day, 'date'));
      get(this, 'popover').hide();
    }
  }
});
