import Collection from '../routes/collection';

export default Collection.extend({
  actions: {
    createMember(params) {
      return this.store.createRecord('member', params).save().then((member) => {
        this.transitionTo('member', member);
      });
    }
  }
});
