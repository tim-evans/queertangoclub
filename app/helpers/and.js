import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
  return params.reduce(function (result, param) {
    return result && param;
  });
});
