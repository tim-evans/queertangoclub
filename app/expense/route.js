import Ember from 'ember';
import RSVP from 'rsvp';
import Restricted from 'torii/routing/authenticated-route-mixin';
import method from 'ember-service-methods/inject';

export default Ember.Route.extend(Restricted, {

  uploadPhoto: method(),

  actions: {
    save(model, changes) {
      return model.get('receipt').then((oldReceipt) => {
        if (changes.receipt) {
          let receipts = [this.uploadPhoto(changes.receipt)];
          if (oldReceipt) {
            receipts.push(oldReceipt.destroyRecord());
          }
          return RSVP.all(receipts);
        }
        return [];
      }).then(function ([receipt]) {
        model.setProperties(changes);
        if (receipt) {
          model.set('receipt', receipt);
        }
        return model.save();
      });
    },
    deleteExpense(model) {
      return model.destroyRecord().then(() => {
        this.transitionTo('expenses');
      });
    }
  }
});
