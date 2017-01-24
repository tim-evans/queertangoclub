import Ember from 'ember';
import layout from './template';

const { get, set, run: { debounce, cancel } } = Ember;

/**
  A `{{search-field}}` is a drop in replacement
  for `<input type="search">`.

  The simplest `{{search-field}}` would be:

  ```htmlbars
  {{search-field query=q onquery=(action (mut q))}}
  ```

  @public
  @class SearchField
  @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,
  classNames: ['search-field'],
  classNameBindings: ['hasIcon'],

  /**
    Whether the search icon should be displayed

    @property hasIcon
    @type Boolean
    @default true
  */
  hasIcon: true,

  /**
    Called whenever the user changes the value.

    @event onquery
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

  didReceiveAttrs() {
    if (this._timer == null) {
      set(this, 'value', get(this, 'query'));
    }
  },

  clear() {
    set(this, 'value', null);
    cancel(this._timer);
    this._timer = null;
    get(this, 'onquery')('');
  },

  search() {
    this._timer = null;
    get(this, 'onquery')(get(this, 'value'));
  },

  actions: {
    change(value) {
      if (Ember.isBlank(value) || value == null) {
        this.clear();
      } else if (value !== get(this, 'value')) {
        set(this, 'value', value);
        this._timer = debounce(this, 'search', 500);
      }
    }
  }
});
