import Ember from 'ember';
import { task } from 'ember-concurrency';

const { get, set } = Ember;

/**
  Example:

  ```js
  export default Ember.Route.extend({
    flash: service(),

    deleteItem: task(function * (item) {
      try {
        item.deleteRecord();
        yield this.flash('Deleting Item', {
          timeout: 5000
        });
      } catch {
        item.rollback();
      } finally {
        item.save();
      }
    })
  });
  ```
*/
export default Ember.Service.extend({
  message: null,

  _notify: task(function * (text, options) {
    let message = Ember.assign({
      text,
    }, options, Ember.RSVP.defer());

    try {
      set(this, 'message', message);

      if (options.timeout) {
        // Race promises; this uses setTimeout instead
        // of Ember.run.later so we can test undo / dismiss.
        // If we didn't do this, tests would pause until
        // the action completed on its own
        this._timer = setTimeout(
          Ember.run.bind(null, message.resolve),
          options.timeout
        );
      }

      yield message.promise;
    } finally {
      set(this, 'message', null);
      clearTimeout(this._timer);
      this._timer = null;
    }
  }),

  execute(text, options={}) {
    // Resolve any messages being shown
    if (get(this, 'message')) {
      get(this, 'message.resolve')();
    }

    return Ember.RSVP.resolve().then(() => {
      return get(this, '_notify').perform(text, options);
    });
  }
});
