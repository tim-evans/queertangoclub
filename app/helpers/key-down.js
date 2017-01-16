import Ember from 'ember';

const { $ } = Ember;
const { bind } = Ember.run;

const CODE_MAP = {
  27: 'esc'
};

/**
  `{{key-down}}` listens to global keyboard events
  and triggers an event when the given key combo is
  pressed. This is useful when handling keyboard
  shortcuts like `⌘  s` for saving, `⌘  -` for zooming
  out, `⌘  +` for zooming in, and `esc` for cancelling
  an action.

  @module
  @augments Ember.Helper
  @param {string} keyCombination A space separated key combination
                                 that will trigger the action
  @param {function} action The closure action to trigger when
                           the key combination is pressed
 */
export default Ember.Helper.extend({
  compute ([combo, action]) {
    if (this._handlers) {
      Object.keys(this._handlers).forEach((eventName) => {
        $(document).off(eventName, this._handlers[eventName]);
      });
    }

    this._handlers = {
      keydown: bind(this, 'keydown', combo.split(' '), action)
    };

    Object.keys(this._handlers).forEach((eventName) => {
      $(document).on(eventName, this._handlers[eventName]);
    });

    return '';
  },

  keydown (combination, action, evt) {
    let keyCode = evt.keyCode || evt.which;
    let isCombo = combination.every((key) => {
      if (evt.hasOwnProperty(key + 'Key')) {
        return evt[key + 'Key'];
      } else {
        let keyPressed = CODE_MAP[keyCode] || String.fromCharCode(keyCode);
        return keyPressed === key;
      }
    });

    if (isCombo && action) {
      action();
      evt.preventDefault();
      return false;
    }
  },

  destroy () {
    Object.keys(this._handlers).forEach((eventName) => {
      $(document).off(eventName, this._handlers[eventName]);
    });
  }
});
