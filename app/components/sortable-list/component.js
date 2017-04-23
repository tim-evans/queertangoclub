import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({

  icon: 'sad',

  displayColumns: computed('columns', {
    get() {
      return get(this, 'columns').map(function (cell) {
        if (typeof cell === 'string') {
          return {
            asc: cell,
            desc: '-' + cell,
            value: cell,
            label: cell,
          };
        }
        cell = Object.assign({}, cell);
        if (cell.asc == null) {
          cell.asc = cell.key;
        }
        if (cell.desc == null) {
          cell.desc = '-' + cell.asc;
        }
        if (cell.value == null) {
          cell.value = cell.key;
        }
        if (cell.label == null) {
          cell.label = cell.key;
        }
        return cell;
      });

    },
    set(_, columns) {
    }
  })
});
