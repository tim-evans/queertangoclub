/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    autoprefixer: {
      browsers: ['> 10%'],
      flexbox: true
    },
    sassOptions: {
      includePaths: ['app']
    },
    svg: {
      optimize: {
        plugins: [
          { convertShapeToPath: false },
          { removeTitle: true },
          { removeDesc: true }
        ]
      },
      paths: [
        'public/assets/images',
        'public/assets/images/icons'
      ]
    }
  });

  return app.toTree();
};
