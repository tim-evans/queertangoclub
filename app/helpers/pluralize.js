import Ember from 'ember';

const { pluralize } = Ember.String;

export default Ember.Helper.helper(function ([string, number]) {
  if (number > 1) {
    return pluralize(string, number);
  } else {
    return string;
  }
});
