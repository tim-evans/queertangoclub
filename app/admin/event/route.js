import Ember from 'ember';
import Resource from '../../routes/resource';

const { set } = Ember;

export default Resource.extend({
  actions: {
    publish(model) {
      set(model, 'published', true);
      return model.save();
    },
    unpublish(model) {
      set(model, 'published', false);
      return model.save();
    }
  }
});
