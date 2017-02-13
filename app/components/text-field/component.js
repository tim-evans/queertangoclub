import Ember from 'ember';
import layout from './template';

const { get, tryInvoke } = Ember;

/**
  A `{{text-field}}` is a drop in replacement
  for `<input type="text">`.

  The simplest `{{text-field}}` would be:

  ```htmlbars
  {{text-field value=score onchange=(action (mut score))}}
  ```

  @public
  @class TextField
  @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  classNames: ['text-field'],

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
      get(this, 'onchange')(null);
    } else {
      get(this, 'onchange')(value);
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
    reformat() {
      let input = get(this, 'element').querySelector('input');
      this._setValue(input.value);
    },
    blur() {
      tryInvoke(this, 'onblur');
    },
    autocomplete(completion) {
      this._setValue(completion);
    }
  }
});
