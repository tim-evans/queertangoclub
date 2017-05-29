import Ember from 'ember';

const { computed, computed: { reads }, generateGuid } = Ember;

export default Ember.Component.extend({
  photo: reads('payload.photo'),

  name: computed({
    get() {
      return generateGuid();
    }
  })
});
