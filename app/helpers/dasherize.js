import Ember from 'ember';

const { dasherize } = Ember.String;

export default Ember.Helper.helper(function ([string]) {
  return dasherize((string || '').replace('.', '-'));
});
