import Ember from 'ember';

export default Ember.Helper.helper(function ([collection, item]) {
  if (typeof collection === 'string') {
    return collection.indexOf(item) !== -1;
  } else {
    return (collection || []).indexOf(parseInt(item, 10)) !== -1;
  }
});
