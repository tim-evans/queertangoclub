import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({
  tagName: 'figure',
  classNames: ['event'],

  event: computed.reads('coverPhoto.event'),
  title: computed('coverPhoto.title', 'event.title', {
    get() {
      return get(this, 'coverPhoto.title') || get(this, 'event.title');
    }
  })
});
