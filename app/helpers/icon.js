import Ember from 'ember';
import { inlineSvg } from './inline-svg';

const { htmlSafe } = Ember.String;

export function icon(name, hash) {
  let attributes = Object.assign({ class: 'icon' }, hash);
  if (attributes.class.indexOf('icon') === -1) {
    attributes.class += ' icon';
  }
  let svg = inlineSvg(name, attributes);
  if (hash.id) {
    svg = svg.toString().replace('svg ', `svg id="${hash.id}" `);
  }

  return htmlSafe(svg);
}

export default Ember.Helper.helper(function ([name], hash) {
  return icon(name, hash);
});
