import Ember from 'ember';
import moment from 'moment';

const { get, set, tryInvoke, run: { later } } = Ember;

const UP = 38;
const DOWN = 40;

export default Ember.Component.extend({
  classNames: ['date-field'],

  /**
    Called whenever the user changes the value.

    @event onchange
    @param {String} value The string
   */

  /**
    The `name` property of the `input` element.

    @property name
    @type String
    @default null
   */
  name: null,

  /**
    Whether or not the field is disabled.

    @property disabled
    @type Boolean
    @default false
   */
  disabled: false,

  didRender() {
    this._updateDisplayValue(this._getValue());
  },

  _getValue() {
    if (get(this, 'isFocused')) {
      let input = get(this, 'element').querySelector('input');
      return input.value;
    } else {
      let value = get(this, 'value');
      return value ? moment(value).format('M/D/YYYY ') : '';
    }
  },

  _setValue(value) {
    let date = moment.tz(value, 'M/D/YYYY', 'America/New_York');
    if (Ember.isBlank(value) || value == null) {
      get(this, 'onchange')(null);
    } else if (date.isValid()) {
      get(this, 'popover').show();
      set(this, 'center', date);
      get(this, 'onchange')(date.toDate());
    } else {
      get(this, 'popover').hide();
    }
    this._updateDisplayValue(value);
  },

  _updateDisplayValue(displayValue) {
    let input = get(this, 'element').querySelector('input');
    let selectionStart = input.selectionStart;
    let selectionEnd = input.selectionEnd;

    input.value = displayValue || '';
    input.selectionStart = selectionStart;
    input.selectionEnd = selectionEnd;
  },

  actions: {
    handleArrowKeys(evt) {
      if (evt.which === UP || evt.which === DOWN) {
        let input = get(this, 'element').querySelector('input');
        let text = input.value;
        let cursor = input.selectionStart;

        let direction = evt.which === UP ? 1 : -1;
        let date = moment(get(this, 'value'));
        if (cursor < 2) {
          date.add(direction, 'month');
        } else if (cursor > 2 && cursor < 5) {
          date.add(direction, 'day');
        } else if (cursor > 5) {
          date.add(direction, 'year');
        }
        this._setValue(date.format('M/D/YYYY'));
        return false;
      }
    },

    restrict(evt) {
      if (evt.which === 32 || evt.shiftKey) {
        return false;
      }

      if (evt.which <= 40) {
        return true;
      }

      return /[\d\/]/.test(String.fromCharCode(evt.which));
    },

    reformat() {
      let input = get(this, 'element').querySelector('input');
      this._setValue(input.value);
    },

    focus() {
      set(this, 'isFocused', true);
      get(this, 'popover').show();
    },

    blur() {
      set(this, 'isFocused', false);
      tryInvoke(this, 'onblur');
      later(() => {
        if (!get(this, 'isFocused')) {
          get(this, 'popover').hide();
        }
      }, 250);
    },

    updateCenter({ date }) {
      set(this, 'center', date);
      set(this, 'isFocused', true);
    },

    onchange({ moment }) {
      this._setValue(moment.format('MM/DD/YYYY'));
      get(this, 'popover').hide();
    }
  }
});
