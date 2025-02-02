module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false,  // Désactive l'exécution aléatoire des tests
        failSpecWithNoExpectations: false
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: false,
    files: [
      { pattern: 'src/assets/**/*', watched: false, included: false, served: true }
    ],
    proxies: {
      '/assets/': '/base/src/assets/'
    },
    // Configuration pour les assets et les URLs
    middleware: ['proxy'],
    proxyRes: {
      '/_karma_webpack_/assets/': '/base/src/assets/'
    }
  });
};