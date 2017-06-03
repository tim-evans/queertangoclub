import Ember from 'ember';
import layout from './template';
import Component from 'ember-mobiledoc-editor/components/mobiledoc-editor/component';

const { computed, get } = Ember;

export default Component.extend({
  layout,
  linkOffsets: computed({
    get() {
      return null;
    },
    set(_, offsets) {
      let popover = get(this, 'popover');
      if (popover) {
        if (offsets == null) {
          popover.hide();
        } else {
          popover.show();
        }
      }
      return offsets;
    }
  })
});
