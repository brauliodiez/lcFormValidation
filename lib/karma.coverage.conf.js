var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon', 'chai-as-promised', 'chai'],
    files: [
      './test/test_index.js'
    ],
    preprocessors: {
      'src/**/*.ts': ['webpack', 'sourcemap', 'coverage'],
      './test/test_index.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
          loaders: [
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              loader: 'awesome-typescript-loader',
              query: {
                  tsconfig: 'tsconfig.test.json'
              }
            },
            //Configuration required by enzyme
            {
                test: /\.json$/,
                loader: 'json'
            }
          ],
          postLoaders: [
              /**
               * Instruments TS source files for subsequent code coverage.
               * See https://github.com/deepsweet/istanbul-instrumenter-loader
               */
              {
                  test: /\.ts$/,
                  loader: 'istanbul-instrumenter-loader',
                  exclude: [
                      /node_modules/,
                      /tests/,
                      /\.(e2e|spec)\.ts$/
                  ]
              }
          ]
      },
      resolve: {
          //Added .json extension required by cheerio (enzyme dependency)
          extensions: ['', '.js', '.ts', '.tsx', '.json']
      },
      //Configuration required by enzyme
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
      }
    },
    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },

    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
          { type: 'text-summary' },
          {
              type: 'json',
              subdir: '.',
              file: 'coverage-final.json'
          }
      ]
    },

    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
          lcovonly: 'coverage/lcov.info',
          html: 'coverage/report'
      },
      timeoutNotCreated: 5000,
      timeoutNoMoreFiles: 1000
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
