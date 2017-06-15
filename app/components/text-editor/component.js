import Ember from 'ember';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';
import createComponentAtom from 'ember-mobiledoc-editor/utils/create-component-atom';
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

  parserPlugins: computed({
    get() {
      function lineBreakParser(node, builder, { addMarkerable, nodeFinished }) {
        if (node.nodeType !== 1 || node.tagName !== 'BR') {
          return;
        }
        addMarkerable(builder.createAtom('line-break', '', {}));
        nodeFinished();
      }
      return [lineBreakParser];
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
        editor.insertCard('photo-card', {
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
    setRange(range, evt) {
      set(this, 'range', range);
      evt.preventDefault();
    },
    addYoutubeEmbed(editor, url, evt) {
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
      evt.preventDefault();
    },
    cancelYoutubeEmbed(evt) {
      get(this, 'popover').hide();
      set(this, 'embedUrl', null);
      set(this, 'offsets', null);
      evt.preventDefault();
    },
    configure(editor) {
      editor.atoms.push(createComponentAtom('line-break'));
      editor.registerKeyCommand({
        str: 'SHIFT+ENTER',
        run(editor) {
          editor.insertAtom('line-break', '', {});
        }
      });
    }
  }
});
