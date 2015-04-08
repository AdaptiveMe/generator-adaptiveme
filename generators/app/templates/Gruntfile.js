/*
 * =| ADAPTIVE RUNTIME PLATFORM |=======================================================================================
 *
 * (C) Copyright 2013-2014 Carlos Lozano Diez t/a Adaptive.me <http://adaptive.me>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * Original author:
 *
 *     * Carlos Lozano Diez
 *                 <http://github.com/carloslozano>
 *                 <http://twitter.com/adaptivecoder>
 *                 <mailto:carlos@adaptive.me>
 *
 * Contributors:
 *
 *     * Ferran Vila Conesa
 *                 <http://github.com/fnva>
 *                 <http://twitter.com/ferran_vila>
 *                 <mailto:ferran.vila.conesa@gmail.com>
 *
 * =====================================================================================================================
 */

'use strict';

var SERVER_PORT = 9000;
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // Individual configurations for all the tasks
  grunt.initConfig({

    <% if (typescript) { %>typescript: {
      base: {
        src: ['src/js/**/*.ts'],
        dest: 'src/js/',
        options: { declaration: false, sourceMap: false, module: 'commonjs', target: 'es5', basePath: 'src/js/', }
      }
    },<% } %>

    // Javascript validator. Skip files in '.jshintignore'
    jshint: {
      options: {jshintrc: 'config/validators/.jshintrc', ignores: []},
      target: {src: ['src/js/**/*.js']}
    },

    // CSS validator. Skip files with ! in front of in src
    csslint: {
      options: {csslintrc: 'config/validators/.csslintrc'},
      target: {src: ['src/css/**/*.css']}
    },

    // Clean folders. Add some sub-tasks to clean every output folder
    clean: {
      'dist': {src: ['dist'], options: {force: true}}
    },

    // Enables a watcher for the files specifies and fires an event to the http server
    watch: {
      files: ['src/**/*.*'],
      tasks: ['test'],
      options: {livereload: LIVERELOAD_PORT}
    },

    // Creates a http server on the port and performs livereload on every watch event fired
    connect: {
      options: {port: SERVER_PORT, hostname: '0.0.0.0'},
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, './')];
          }
        }
      }
    },

    // Open a browser on the url and port specified
    open: {
      server: {url: 'http://localhost:' + SERVER_PORT + '/src'}
    },

    // Configure the concat and uglify of de js and css
    useminPrepare: {
      html: 'src/*.html',
      options: {dest: 'dist/www'}
    },

    // Execute the tasks of minifying, compression, etc...
    usemin: {
      html: 'dist/www/*.html',
      css: ['dist/www/*.css']
    },

    // Copy the html and images
    copy: {
      release: {files: [{expand: true, cwd: 'src', src: ['images/*.{png,gif,jpg,svg}','img/*.{png,gif,jpg,svg}', 'fonts/*', '*.html'], dest: 'dist/www'}]},
      config: {files: [{expand: true, cwd: 'config', src: ['*.xml', '*.plist'], dest: 'dist/config'}]}
    },

    // Adds a custom file name to avoid cache
    filerev: {
      options: {encoding: 'utf8', algorithm: 'md5', length: 20},
      release: {files: [{src: ['dist/www/images/*.{png,gif,jpg,svg}', 'dist/www/*.js', 'dist/www/*.css']}]}
    },

    htmlmin: {
      dist: {
        options: {removeComments: true, collapseWhitespace: true},
        files: [{expand: true, cwd: 'dist', src: '*.html', dest: 'dist/www/'}]
      }
    },

    replace: {
      html: {
        src: ['dist/www/*.css'],
          overwrite: true,
          replacements: [
            {from: '../fonts/', to: 'fonts/'},
            {from: '../images/', to: 'images/'},
            {from: '../img/', to: 'img/'},
          ]
      }
    }/*,

    exec: {
      nibble: 'node node_modules/npm-adaptiveme-nibble/bin/index.js -p src -w true'
    }*/

  });

  grunt.registerTask('default', ['server']);
  grunt.registerTask('test', [<% if(typescript) { %>'typescript', <% } %>'jshint', 'csslint']);
  grunt.registerTask('server', ['connect:livereload', 'open', 'watch']);
  //grunt.registerTask('nibble', 'exec:nibble');
  grunt.registerTask('build', ['test', 'clean:dist', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'copy:release', 'replace:html', 'copy:config', 'filerev', 'usemin', 'htmlmin']);

  // alias tasks
  grunt.registerTask('dist', ['build']);
  grunt.registerTask('serve', ['server']);

  grunt.loadNpmTasks('connect-livereload');
  grunt.loadNpmTasks('grunt');
  grunt.loadNpmTasks('grunt-cli');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-exec');
  <% if(typescript) { %>grunt.loadNpmTasks('grunt-typescript');<% } %>

};
