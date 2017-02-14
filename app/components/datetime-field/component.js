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
      return value ? moment(value).format('M/D/YYYY h:mma') : '';
    }
  },

  _setValue(value) {
    let date = moment.tz(value, 'M/D/YYYY h:mma', 'America/New_York');
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
        if (cursor < text.indexOf('/')) {
          date.add(direction, 'month');
        } else if (cursor > text.indexOf('/') && cursor < text.indexOf('/', 2)) {
          date.add(direction, 'day');
        } else if (cursor > text.indexOf('/', 2) && cursor < text.indexOf(' ')) {
          date.add(direction, 'year');
        } else if (cursor > text.indexOf(' ') && cursor <= text.indexOf(':')) {
          date.add(direction, 'hour');
        } else if (cursor > text.indexOf(':') && cursor < text.length - 2) {
          date.add(direction, 'minute');
        } else if (cursor => text.length - 2 && cursor <= text.length) {
          if (text.slice(-2) === 'am') {
            date.add(12, 'hours');
          } else {
            date.subtract(12, 'hours');
          }
        }
        this._setValue(date.format('M/D/YYYY h:mma'));
        return false;
      }
    },

    restrict(evt) {
      if (evt.shiftKey && evt.which !== 58) {
        return false;
      }

      if (evt.which <= 40) {
        return true;
      }

      return /[:\d\w\/apm]/.test(String.fromCharCode(evt.which));
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

    autocomplete(completion) {
      this._setValue(completion);
    },

    updateCenter({ date }) {
      set(this, 'center', date);
      set(this, 'isFocused', true);
    },

    onchange({ moment }) {
      this._setValue(moment.format('MM/DD/YYYY h:mma'));
      get(this, 'popover').hide();
    }
  }
});
