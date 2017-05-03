/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'queertangoclub',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    API_KEY: 'dec9a21ca4318af737ecceb2ddb1901c',
    API_HOST: 'http://localhost:3000',
    ZIP_API_KEY: 'js-UgjzTROXe9B7ac3ruujT6W4TqAIwT86OppnihcfwlRDw4HYycisiewcE7Va03hOt',
    GOOGLE_MAPS_API_KEY: 'AIzaSyCEXiB9AwC377Dhmbni6tRWGnfjHvhTQcE',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    torii: {
      // a 'session' property will be injected on routes and controllers
      sessionServiceName: 'session',
      providers: {
        'facebook-oauth2': {
          apiKey: '1515089595488289',
          scope: 'email',
          redirectUri: 'http://localhost:4200/login'
        },
        'google-oauth2': {
          apiKey: '402335146444-vtuagbpfsspglokc7mrrb2u0c8oh1ji5.apps.googleusercontent.com',
          scope: 'email',
          redirectUri: 'http://localhost:4200/login'
        }
      }
    },
    moment: {
      includeTimezone: 'all'
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
