import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Component.extend({

  classNames: ['file-field'],

  didReceiveAttrs() {
    let file = get(this, 'value');
    if (file) {
      file.readAsDataURL().then((url) => {
        set(this, 'url', url);
      });
    }
  }
});