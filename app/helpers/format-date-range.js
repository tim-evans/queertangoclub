import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.helper(function ([startDate, endDate]) {
  if (moment(startDate).isSame(moment(endDate))) {
    return moment(startDate).format('MMMM D, YYYY');
  } else if (moment(startDate).diff(moment(endDate), 'months') === 0) {
    return `${moment(startDate).format("MMMM D")} - ${moment(endDate).format('D, YYYY')}`;
  } else {
    return `${moment(startDate).format("MMMM D, YYYY")} - ${moment(endDate).format('MMMM D, YYYY')}`;
  }
});
