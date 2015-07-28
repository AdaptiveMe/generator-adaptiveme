'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    // Individual configurations for all the tasks
    grunt.initConfig({

        typescript: {
            base: {
                src: ['src/js/**/*.ts'],
                dest: 'src/js/',
                options: {declaration: false, sourceMap: false, module: 'commonjs', target: 'es5', basePath: 'src/js/',}
            }
        },

        // Javascript validator. Skip files in '.jshintignore'
        jshint: {
            options: {
                jshintrc: 'config/validators/.jshintrc', ignores: []
            },
            target: {
                src: ['src/js/**/*.js']
            }
        },

        // CSS validator. Skip files with ! in front of in src
        csslint: {
            options: {
                csslintrc: 'config/validators/.csslintrc'
            },
            target: {
                src: ['src/css/**/*.css']
            }
        },

        // Clean folders. Add some sub-tasks to clean every output folder
        clean: {
            dist: {
                src: ['dist'], options: {
                    force: true
                }
            }
        },

        // Enables a watcher for the files specifies and fires an event to the http server
        watch: {
            files: ['src/**/*.*'],
            tasks: ['test']
        },

        // Configure the concat and uglify of de js and css
        useminPrepare: {
            html: 'src/*.html',
            options: {
                dest: 'dist/www'
            }
        },

        // Execute the tasks of minifying, compression, etc...
        usemin: {
            html: 'dist/www/*.html',
            css: ['dist/www/*.css']
        },

        // Copy the html and images
        copy: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['images/*.{png,gif,jpg,svg}', 'img/*.{png,gif,jpg,svg}', 'fonts/*', '*.html'],
                    dest: 'dist/www'
                }]
            },
            config: {
                files: [{expand: true, cwd: 'config', src: ['*.xml', '*.plist'], dest: 'dist/config'}]
            },
            config_file: {
                files: [{expand: true, cwd: '', src: 'adaptive.yml', dest: 'dist'}]
            }
        },

        // Adds a custom file name to avoid cache
        filerev: {
            options: {
                encoding: 'utf8', algorithm: 'md5', length: 20
            },
            release: {
                files: [{src: ['dist/www/images/*.{png,gif,jpg,svg}', 'dist/www/*.js', 'dist/www/*.css']}]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true, collapseWhitespace: true
                },
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
                    {from: '../img/', to: 'img/'}
                ]
            }
        },

        exec: {
            nibble: 'nibble -p src -w true'
        }
    });

    grunt.registerTask('test', ['typescript', 'jshint', 'csslint']);
    grunt.registerTask('nibble', 'exec:nibble');
    grunt.registerTask('build', ['test', 'clean:dist', 'useminPrepare', 'concat:generated', 'cssmin:generated',
        'uglify:generated', 'copy:release', 'replace:html', 'copy:config', 'copy:config_file', 'filerev', 'usemin', 'htmlmin']);

    // alias tasks
    grunt.registerTask('dist', ['build']);
    grunt.registerTask('default', ['test']);

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

};
