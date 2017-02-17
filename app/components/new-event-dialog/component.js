import Ember from 'ember';

const { get, set, isBlank } = Ember;

export default Ember.Component.extend({
  classNames: ['new-event-dialog'],

  actions: {
    fillInEndsAt({ changeset }) {
      let startsAt = get(changeset, 'startsAt');
      let endsAt = get(changeset, 'endsAt');
      if (isBlank(endsAt)) {
        set(changeset, 'endsAt', startsAt);
      }
    },
    submit(model, changes) {
      return get(this, 'onsubmit')(changes).then(get(this, 'dismiss'));
    }
  }
});

