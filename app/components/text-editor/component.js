import Ember from 'ember';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';
import { MOBILEDOC_VERSION } from 'mobiledoc-kit/renderers/mobiledoc';

const { get, set, computed } = Ember;

const BLANK_POST = {
  "version": MOBILEDOC_VERSION,
  "atoms": [],
  "cards": [],
  "markups": [],
  "sections": [
    [
      1,
      "p",
      []
    ]
  ]
};

export default Ember.Component.extend({
  classNames: ['text-editor'],
  cards: computed({
    get() {
      return [
        createComponentCard('photo-card'),
        createComponentCard('youtube-card')
      ];
    }
  }),

  osx: navigator.platform.match(/Mac/),

  mobiledoc: computed({
    get() {
      try {
        return JSON.parse(get(this, 'value'));
      } catch (e) {
        return BLANK_POST;
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
    },
    addYoutubeEmbed(editor, url) {
      editor.selectRange(get(this, 'range'));
      editor.insertCard('youtube-card', {
        url,
        width: 640,
        height: 360,
        autoplay: false
      });
      get(this, 'popover').hide();
      set(this, 'embedUrl', null);
      set(this, 'offsets', null);
    },
    cancelYoutubeEmbed() {
      get(this, 'popover').hide();
      set(this, 'embedUrl', null);
      set(this, 'offsets', null);
    }
  }
});
