module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'), // Ajouter le plugin junit reporter pour GitLab
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // Permet de ne pas effacer les résultats des tests dans la fenêtre du navigateur
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'], // Ajout du reporter junit
    junitReporter: {
      outputDir: 'test-results',  // Répertoire où les résultats seront sauvegardés
      outputFile: 'test-results.xml',  // Nom du fichier XML de sortie
      useBrowserName: false        // Ne pas inclure le nom du navigateur dans le rapport
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Désactive le mode watch pour l'exécution en CI
    browsers: ['ChromiumHeadlessCI'],  // Utilise ChromiumHeadlessCI
    singleRun: true, // Les tests s'exécutent une seule fois
    restartOnFileChange: false,
    customLaunchers: {
      ChromiumHeadlessCI: {
        base: 'ChromiumHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-web-security'
        ]
      }
    }
  });
};
