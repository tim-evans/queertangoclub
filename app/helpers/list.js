import Ember from 'ember';

export default Ember.Helper.helper(function (list) {
  list = list.slice();
  list.toString = function () {};
  return list;
});
