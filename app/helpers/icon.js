import Ember from 'ember';

const { htmlSafe } = Ember.String;

export default Ember.Helper.helper(function ([name], hash) {
  let classNames = hash['class'];
  if (classNames) {
    classNames += ' icon';
  } else {
    classNames = 'icon';
  }
  return htmlSafe(`<svg class='${classNames}'><use xlink:href='#${name}'></svg>`);
});
