import Ember from 'ember';
import layout from './template';

const { get, run: { debounce, cancel } } = Ember;

/**
  A `{{search-field}}` is a drop in replacement
  for `<input type="search">`.

  The simplest `{{search-field}}` would be:

  ```htmlbars
  {{search-field value=q onchange=(action (mut q))}}
  ```

  @public
  @class SearchField
  @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  classNames: ['search-field'],

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
    return get(this, 'value');
  },

  _setValue(value) {
    if (Ember.isBlank(value) || value == null) {
      get(this, 'onchange')('');
      cancel(this._timer);
    } else {
      this._timer = debounce(this, 'onchange', value, 500);
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
    clear() {
      this._setValue(null);
    },

    reformat() {
      let input = get(this, 'element').querySelector('input');
      this._setValue(input.value);
    }
  }
});
