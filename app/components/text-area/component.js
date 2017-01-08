import Ember from 'ember';
import layout from './template';

const { get } = Ember;

/**
  A `{{text-area}}` is a drop in replacement
  for `<textarea>`.

  The simplest `{{text-area}}` would be:

  ```htmlbars
  {{text-area value=score onchange=(action (mut score))}}
  ```

  @public
  @class TextArea
  @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  classNames: ['text-area'],

  /**
    Called whenever the user changes the value.

    @event onchange
    @param {String} value The string
   */

  /**
    The `name` property of the `textarea` element.

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
    let textarea = get(this, 'element').querySelector('textarea');
    let selectionStart = textarea.selectionStart;
    let selectionEnd = textarea.selectionEnd;

    textarea.value = displayValue;
    textarea.selectionStart = selectionStart;
    textarea.selectionEnd = selectionEnd;
  },

  actions: {
    reformat() {
      let textarea = get(this, 'element').querySelector('textarea');
      this._setValue(textarea.value);
    }
  }
});
