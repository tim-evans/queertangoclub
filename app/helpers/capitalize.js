import Ember from 'ember';

const { dasherize, capitalize } = Ember.String;

export default Ember.Helper.helper(function ([string]) {
  let name = string || '';
  name = name.split('.').slice(-2).join('-');
  return dasherize(name).split('-').map(capitalize).join(' ');
});
