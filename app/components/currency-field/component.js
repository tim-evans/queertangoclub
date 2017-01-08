import Ember from 'ember';
import NumberField from '../number-field/component';
import { l } from '../../helpers/l';

const { get } = Ember;

export default NumberField.extend({
  classNames: ['currency-field'],

  precision: 2,

  _format(number) {
    let precision = get(this, 'precision');

    return l('currency', number, {
      precision,
      'strip-insignificant-zeros': true
    }) || '';
  },

  _getValue() {
    let value = get(this, 'value');
    if (value != null) {
      return get(this, 'value') / 100;
    }
  },

  _setValue(value) {
    if (value != null) {
      get(this, 'onchange')(parseFloat((value * 100).toFixed(get(this, 'precision') - 2), 10));
    } else {
      get(this, 'onchange')(value);
    }
    this._updateDisplayValue(value);
  },

  _stepValue(step) {
    this._setValue(this._clamp((this._getValue() || 0) + step));
  },

  _trimDecimals(oldString, newString, precision) {
    let trimmedString = newString;

    if (trimmedString.indexOf('.') === -1 &&
        oldString.indexOf('.') !== -1) {
      trimmedString = '$' + trimmedString.replace(/\$/g, '') + '.' + oldString.slice(
        oldString.indexOf('.'),
        oldString.indexOf('.') + precision + 1
      ).replace(/\./g, '');
    }

    return trimmedString;
  },

  _moveCursor(previousCursorPosition, previousValue, newValue) {
    let input = get(this, 'element').querySelector('input');

    if (parseFloat(previousValue, 10) > get(this, 'max')) {
      input.selectionStart = input.selectionEnd = newValue.length + 1;
    } else if (previousCursorPosition !== null &&
        previousCursorPosition === previousValue.length) {
      input.selectionStart = newValue.length + 1;
      input.selectionEnd = newValue.length + 1;
    } else {
      this._super(previousCursorPosition, previousValue, newValue);
    }
  }
});
