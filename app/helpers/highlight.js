import Ember from 'ember';

const { htmlSafe } = Ember.String;

export default Ember.Helper.helper(function ([text], { match }) {
  let start = (text || '').toLowerCase().indexOf((match || '').toLowerCase());
  let end = start + (match || '').length;
  return htmlSafe(text.slice(0, start) + '<u>' + text.slice(start, end) + '</u>' + text.slice(end));
});
