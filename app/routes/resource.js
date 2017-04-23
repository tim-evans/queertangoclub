import Ember from 'ember';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

const { pluralize } = Ember.String;

export default Ember.Route.extend(Restricted, {

  model(params) {
    let segments = this.routeName.split('.');
    let modelName = segments.pop();
    let modelId = params[`${modelName}_id`];
    if (modelId) {
      return this.store.find(modelName, modelId);
    } else {
      return this.modelFor(segments.join('.'));
    }
  },

  flash: method(),

  save: method(),

  actions: {
    error() {
      let segments = this.routeName.split('.');
      let modelName = segments.pop();
      this.replaceWith(`${segments.join('.')}.${pluralize(modelName)}`);
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
        let [, modelName] = this.routeName.split('.');
        this.replaceWith(`admin.${pluralize(modelName)}`);
      });
    }
  }
});
