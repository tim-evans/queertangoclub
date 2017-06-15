import Ember from 'ember';
import { svgJar } from './svg-jar';

export function icon(name, hash) {
  let attributes = Object.assign({ class: 'icon' }, hash);
  if (attributes.class.indexOf('icon') === -1) {
    attributes.class += ' icon';
  }

  return svgJar(name, attributes);
}

export default Ember.Helper.helper(function ([name], hash) {
  return icon(name, hash);
});
