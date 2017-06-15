import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.helper(function ([lhs, rhs]) {
  return moment(lhs).isSame(rhs, 'day');
});
