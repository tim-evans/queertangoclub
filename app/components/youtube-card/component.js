import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['youtube-card'],

  videoId: computed('payload.url', {
    get() {
      let url = get(this, 'payload.url');
      return (
        url.match(/youtube\.com\/watch\?v=([^\/]+)/) ||
        url.match(/youtu.be\/([^\/]+)/) ||
        url.match(/youtube\.com\/embed\/([^\/]+)/)
      )[1];
    }
  }),

  origin: computed({
    get() {
      return window.protocol + '//' + window.hostname;
    }
  })
});
