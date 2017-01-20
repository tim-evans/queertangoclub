import Ember from 'ember';
import $ from 'jquery';

const { get } = Ember;

export default Ember.Component.extend({

  classNames: ['hero-image'],

  didInsertElement() {
    this._tile = Ember.run.bind(this, 'tile');
    $(window).on('resize', this._tile);
    $(window).on('orientationchange', this._tile);
    this._tile();
  },

  willDestroyElement() {
    $(window).off('resize', this._tile);
    $(window).off('orientationchange', this._tile);
  },

  didReceiveAttrs() {
    this.tile();
  },

  tile() {
    if (get(this, 'element') == null || get(this, 'hero') == null) { return; }

    let element = this.get('element');
    let display = element.style.display;
    element.style.display = 'none';
    let height = $(document).height();
    element.style.display = display;

    let width = window.innerWidth;
    let hero = this.get('element');
    display = hero.style.display;
    hero.style.display = 'none';

    hero.style.display = display;
    hero.style.height = height + 'px';
    hero.style.width = width + 'px';

    let imageSize = {
      width: get(this, 'hero.width'),
      height: get(this, 'hero.height')
    };

    let scale;
    if ((width / height) > (imageSize.width / imageSize.height)) {
      scale = width / imageSize.width;
    } else {
      scale = height / imageSize.height;
    }

    let margin = width - (imageSize.width * scale);
    this.$('img').css({
      height: (imageSize.height * scale) + 'px',
      width: (imageSize.width * scale) + 'px',
      marginLeft: (margin / 2) + 'px'
    });
  }

});
