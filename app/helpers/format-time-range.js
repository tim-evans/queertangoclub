import Ember from 'ember';
import moment from 'moment';

function formatTime(time) {
  if (time.format('mm') === '00') {
    return time.format('h');
  } else {
    return time.format('h:mm');
  }
}

export default Ember.Helper.helper(function ([s, e]) {
  let startsAt = moment(s);
  let endsAt = moment(e);

  if (startsAt.format('A') === endsAt.format('A')) {
    return `${formatTime(startsAt)} - ${formatTime(endsAt)}${endsAt.format('A')}`;
  } else {
    return `${formatTime(startsAt)}${startsAt.format('A')} - ${formatTime(endsAt)}${endsAt.format('A')}`;
  }
});
