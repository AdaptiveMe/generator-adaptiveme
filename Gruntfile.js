'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    eslint: {
      all: {
        src: ['generators/app/index.js', 'test']
      }
    },

    jscs: {
      all: {
        src: ['Gruntfile.js', 'generators/app/index.js', 'test/**/*.js'],
        options: {config: '.jscsrc'}
      }
    },

    mochaTest: {
      all: {
        options: {reporter: 'spec'},
        src: ['test/adaptive.js']
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('lint', ['eslint', 'jscs']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['lint', 'test']);
};
