import Ember from 'ember';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';

const { get, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['text-editor'],
  cards: computed({
    get() {
      return [
        createComponentCard('photo-card')
      ];
    }
  }),

  mobiledoc: computed({
    get() {
      try {
        return JSON.parse(get(this, 'value'));
      } catch (e) {
        return null;
      }
    }
  }),

  actions: {
    upload(editor, file) {
      return get(this, 'onupload')(file).then(function (photo) {
        editor.editor.insertCard('photo-card', {
          id: get(photo, 'id'),
          url: get(photo, 'url'),
          title: get(photo, 'title'),
          caption: get(photo, 'caption')
        });
      });
    },
    change(mobiledoc) {
      get(this, 'onchange')(JSON.stringify(mobiledoc));
    }
  }
});
