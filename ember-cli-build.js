/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['app']
    },
    svg: {
      optimize: false,
      paths: [
        'public/assets/images'
      ]
    },
    autoprefixer: {
      browsers: ['> 10%'],
      flexbox: true
    }
  });

  return app.toTree();
};
