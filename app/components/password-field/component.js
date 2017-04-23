import Ember from 'ember';
import layout from './template';

const { get, tryInvoke } = Ember;

/**
  A `{{password-field}}` is a drop in replacement
  for `<input type="password">`.

  The simplest `{{password-field}}` would be:

  ```htmlbars
  {{password-field value=score onchange=(action (mut score))}}
  ```

  @public
  @class PasswordField
  @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  classNames: ['password-field'],

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
    if (Ember.isEmpty(value) || value == null) {
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
    }
  }
});
