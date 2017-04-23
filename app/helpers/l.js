import Ember from 'ember';
import moment from 'moment';

function format(value, name, options) {
  if (options.format === 'short') {
    return `${value}${name.charAt(0)}`;
  } else {
    if (value === 1) {
      return `${value} ${name.slice(0, -1)}`;
    } else {
      return `${value} ${name}`;
    }
  }
}

function formatDuration(value, options={}) {
  let parts = [];

  let duration = moment.duration(value);
  let precision = options.precision || 'seconds';

  let units = ['days', 'hours', 'minutes', 'seconds'];
  units.forEach(function (unit) {
    let value = Math.floor(duration[unit]());
    if (value && units.indexOf(unit) <= units.indexOf(precision)) {
      parts.push(format(value, unit, options));
      duration.subtract(value, unit);
    }
  });

  if (options.truncate) {
    return parts[0];
  } else {
    return parts.join(' ');
  }
}

let formatters = {
  percent(value, hash) {
    return l('number', value, hash) + '%';
  },

  currency(value, hash) {
    return '$' + l('number', value / 100, hash);
  },

  number(value, hash) {
    if (hash.precision != null) {
      value = parseFloat(value.toFixed(hash.precision), 10);
    }

    let sign = '';
    if (value < 0) {
      value = Math.abs(value);
      sign = '-';
    }
    let [wholeNumber, decimal] = value.toString().split('.');
    let groupings = [];
    while (wholeNumber.length) {
      groupings.unshift(wholeNumber.slice(-3));
      wholeNumber = wholeNumber.slice(0, -3);
    }

    if ((decimal || '').length < (hash.precision || 0) &&
        !hash['strip-insignificant-zeros']) {
      decimal = decimal || '';
      decimal += Array(hash.precision - (decimal || '').length + 1).join('0');
    }

    return sign + Ember.A([groupings.join(','), decimal]).compact().join('.');
  },

  date(value, hash) {
    return moment(value).format(hash.format || 'MMM D, YYYY [at] h:mmA');
  },

  duration(value, hash) {
    if (hash['in']) {
      value = moment.duration(value, hash['in']);
    }
    return formatDuration(value, hash);
  }
};

/**
  Localizes values according to type.

  This helper takes a value and type, and returns a string with
  the value formatted according to built-in configuration.

  Supported types are:

  | Type       | Description     |
  |------------|-----------------|
  | `number`   | Returns a number split with commas. Accepts `precision` as an option to trim decimal places
  | `percent`  | Returns a formatted number appended with a `%` sign.
  | `currency` | Returns a formatted number in USD. Numbers are expected to be in dollars instead of cents.
  | `date`     | Returns a human readable version of a full datetime. Accepts a `format` option in [moment.js](http://momentjs.com/docs/#/displaying/) style.
  | `duration` | Returns milliseconds as a human readable duration. Accepts a `format` option (either 'short' or 'long') and `truncate`, which will return the largest unit of time. If the duration provided is in a format other than milliseconds, providing the unit to `in` will fix it. Precision for durations is provided using the name of the unit (cf. 'minutes', 'hours')


  Example:

  ```handlebars
  {{l 'number' 12345}}
  {{! 12,345}}

  {{l 'percent' 12.75 precision=0}}
  {{! 13%}}

  {{l 'currency' 1000043}}
  {{! $10,000.43}}

  {{l 'date' christmasEve}}
  {{! Dec 25, 2015 at 12:00am}}

  {{l 'date' groundhogDay format='MMMM D, YYYY'}}
  {{! February 3, 2016}}

  {{l 'duration' 345600000}}
  {{! 4 days}}
  ```

  @public
  @method l
  @param {String} type The type of localization to perform
  @param {Object} value The value of the object to localize
  @return {String} The localized value
  @for Helpers
 */
export function l(type, value, hash={}) {
  if (value == null) {
    return hash.default;
  }

  if (formatters[type]) {
    return formatters[type](value, hash);
  }

  return value;
}

export default Ember.Helper.helper(function([type, value], hash={}) {
  return l(type, value, hash);
});
