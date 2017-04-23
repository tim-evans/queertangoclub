import Ember from 'ember';

export default Ember.Helper.helper(function ([lhs, rhs]) {
  return moment(lhs).isSame(rhs, 'day');
});
