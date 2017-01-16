import Ember from 'ember';
import layout from './template';

const { get, set } = Ember;

/**
  `{{dialog-box}}`es are a modal dialog
  component. This component is used to both mount
  and render dialogs in apps.

  To mount the dialog, place the following code
  in your application template:

  ```htmlbars
  {{dialog-box}}
  ```

  This lets the dialog box know where to render
  boxes that are rendered in other routes.

  When a dialog should be displayed, render it by
  showing it in an if:

  ```htmlbars
  {{#if sorting}}
    {{#with (action (mut sorting) false) as |dismiss|}}
      {{dialog-box (component 'sorting-hat-dialog' onsort=(pipe (action (mut house)) dismiss))
                   ondismiss=dismiss}}
    {{/with}}
  {{/if}}
  ```

  This example has a few things worth noting.

  Dialogs do not dismiss automatically when an action
  is triggered. They must be dismissed after completing
  the action. This allows for the dialog to remain open
  while saving, etc. This can also be handled inside the
  component if you wish.

  `ondismiss` is a required action by `{{dialog-box}}`.
  This action should dismiss the dialog from the screen.

  Components created by the dialog box are given a hash
  with helpers provided by the dialog itself. These are:

  - `dismiss`

  @public
  @class DialogBox
  @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: '',
  layout,

  /**
    `ondismiss` is triggered when the dialog is dismissed.
    The action taken by this handler should remove the
    `{{dialog-box}}` component from the page.

    @event ondismiss
   */
  ondismiss: null,

  /**
    `dialog-class` is a list of classes that will be added
    to the root of the dialog that's being rendered.

    @property dialog-class
    @default ''
    @type String
   */
  'dialog-class': '',

  didReceiveAttrs() {
    let send = {
      className: 'dialog-box',
      dismiss: get(this, 'ondismiss'),
      dialog: get(this, 'dialog'),
      class: get(this, 'dialog-class')
    };

    if (get(this, 'send.dialog')) {
      delete send.dialog;
      Ember.setProperties(this, 'send', send);
    } else {
      set(this, 'send', send);
    }
  }

}).reopenClass({
  positionalParams: ['dialog']
});

