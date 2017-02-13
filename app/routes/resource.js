import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

const { pluralize } = Ember.String;

export default Ember.Route.extend(Restricted, {

  flash: method(),

  save: method(),

  actions: {
    error() {
      this.replaceWith(pluralize(this.routeName));
    },

    save(model, changes) {
      return this.save(model, changes);
    },

    accessDenied() {
      this.transitionTo('index');
    },

    deleteRecord(model) {
      return model.destroyRecord().then(() => {
        this.flash(`"${model.get('name') || model.get('title') || model.get('email')}" was removed.`, {
          timeout: 5000
        });
        this.replaceWith(pluralize(this.routeName));
      });
    }
  }
});
