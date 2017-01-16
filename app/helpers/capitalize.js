import Ember from 'ember';

const { dasherize, capitalize } = Ember.String;

export default Ember.Helper.helper(function ([string]) {
  return dasherize(string || '').split('-').map(capitalize).join(' ');
});
