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

/**
 * This script runs the adaptive app generator. The script can be runned with
 * parameters or using the interactive mode.
 */

'use strict';

var yeoman = require('yeoman-generator'),
    exit = require('exit'),
    chalk = require('chalk'),
    util = require('util'),
    path = require('path'),
    mkdirp = require('mkdirp');

// Options default
var install = true;
var start_nibble = false;

// Parameters default
var param_app_name = '';
var param_adaptive_version = 'latest';
var param_typescript = false;
var param_boilerplate = 0; // HTML5 Boilerplate
var param_platforms = ['ios', 'android'];
var param_ios_version = '8.3';
var param_android_version = '5.1';
var numberOfParams = 5;

// Boilerplate options
var html5 = 'HTML5 Boilerplate';
var mobile = 'Mobile HTML5 Boilerplate';
var responsive = 'Initializr Responsive';
var boostrap = 'Initializr Boostrap';

// Platform options
var platforms = ['ios','android'];
var ios_versions = ['8.1', '8.2', '8.3'];
var android_versions = ['5.0', '5.1'];

/*var client = github.client();
var ghrepo = client.repo('AdaptiveMe/adaptive-arp-api');

ghrepo.tags(function(err, data, headers) {
    console.log(chalk.red('[generator-adaptive] ' + data[0].name));
    param_adaptive_version=data[0].name;

});*/

module.exports = AdaptiveGenerator;

/**
 * Adaptive app generator constructor. Read attributes, options, etc...
 */
function AdaptiveGenerator(args, options, config) {

    console.log(chalk.red(args));
    console.log(chalk.red(JSON.stringify(arguments)));

    yeoman.generators.Base.apply(this, arguments);

    // arguments
    this.argument('arg1', {
        type: String, required: false, optional: true, desc: 'Your project name'
    });
    this.argument('arg2', {
        type: String, required: false, optional: true, desc: 'Adaptive Javascript Library version (defaults = latest)'
    });
    this.argument('arg3', {
        type: Boolean, required: false, optional: true, desc: 'Add typescript support'
    });
    this.argument('arg4', {
        type: String, required: false, optional: true, desc: 'Boilerplate for initialize application'
    });
    this.argument('arg5', {
        type: Array, required: false, optional: true, desc: 'Array of platforms selected. ex: [ios,android]'
    });
    /*this.argument('arg6', {
        type: String, required: false, optional: true, desc: 'iOS version selected. ex: 8.1'
    });
    this.argument('arg7', {
        type: String, required: false, optional: true, desc: 'Android version selected. ex: 5.0'
    });*/

    // options
    this.option('skip-install', {type: Boolean, desc: 'Skip dependencies installation', defaults: false});
    this.option('start-nibble', {type: Boolean, desc: 'Start the nibble emulator at the end of the generation. The nibble should be installed globally.', defaults: false});
    this.option('ios-version', {type: String, desc: 'iOS version selected. ex: 8.1', defaults: false});
    this.option('android-version', {type: String, desc: 'Android version selected. ex: 5.0', defaults: false});

}

util.inherits(AdaptiveGenerator, yeoman.generators.Base);

/**
 * Prints a header for the script
 */
AdaptiveGenerator.prototype.initializing = function initializing() {

    this.log(chalk.green('[generator-adaptive] Starting generator...'));

    if (this.options['skip-install']) {
        install = false;
    }
    if (this.options['start-nibble']) {
        start_nibble = true;
    }
    if (this.options['ios-version']) {
        param_ios_version = this.options['ios-version'];
    }
    if (this.options['android-version']) {
        param_android_version = this.options['android-version'];
    }
};

/**
 * Prompts questions to the user in order to configurate the application
 */
AdaptiveGenerator.prototype.prompting = function prompting() {

    var argsLength = this.args.length;

    if (argsLength === 0) {

        // Interactive mode

        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'name',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) {
                    param_app_name = input;
                    return true;
                }
                return 'Your application name cannot contain special characters or a blank space';
            },
            message: 'What is the base name of your application?',
            default: this.appname
        }, {
            type: 'input',
            name: 'version',
            validate: function (input) {
                if (/^v([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/.test(input) || input === 'latest') {
                    param_adaptive_version = input;
                    return true;
                } else {
                    return 'The version of the library has to follow the Semantic Versioning (http://semver.org/) ';
                }
            },
            message: 'What version of Adaptive library want to use?',
            default: param_adaptive_version
        }, {
            type: 'confirm',
            name: 'param_typescript',
            message: 'Do you want to add Typescript support to the project?',
            default: param_typescript
        }, {
            type: 'list',
            name: 'param_boilerplate',
            message: 'Select one boilerplate to initialize the application:',
            choices: [
                html5, // Empty application with some HTML5 features (CSS normalization, Modernizr) - http://demo.html5boilerplate.com/
                mobile, // Simple Mobile Application Boilerplate (jQuery, CSS normalization, Mobile Optimizations) - https://html5boilerplate.com/mobile/
                responsive, // Responsive Boilerplate for creating multi-device applications (CSS normalization, Modernizr) - http://www.initializr.com/try
                boostrap, // Boilerplate template for creating applications with boostrap (Boostrap) - http://getbootstrap.com/examples/jumbotron/
                'None'
            ],
            default: param_boilerplate
        }, {
            type: 'checkbox',
            name: 'param_platforms',
            message: 'Select the supported platforms:',
            choices: [
                platforms[0],
                platforms[1]
            ],
            default: param_platforms
        }], function (answers) {

            param_typescript = JSON.parse(answers.param_typescript);
            param_boilerplate = answers.param_boilerplate;
            param_platforms = answers.param_platforms;

            if (param_platforms.indexOf('ios') > -1 && param_platforms.indexOf('android') > -1) {
                this.prompt([{
                    type: 'list',
                    name: 'param_ios_version',
                    message: 'Select the minimum version of ios version:',
                    choices: [
                        ios_versions[0],
                        ios_versions[1],
                        ios_versions[2]
                    ],
                    default: ios_versions[2]
                },{
                    type: 'list',
                    name: 'param_android_version',
                    message: 'Select the minimum version of android version:',
                    choices: [
                        android_versions[0],
                        android_versions[1]
                    ],
                    default: android_versions[1]
                }], function (answers) {
                    param_ios_version = answers.param_ios_version;
                    param_android_version = answers.param_android_version;
                    done();
                }.bind(this));

            } else if (param_platforms.indexOf('ios') > -1) {
                this.prompt([{
                    type: 'list',
                    name: 'param_ios_version',
                    message: 'Select the minimum version of ios version:',
                    choices: [
                        ios_versions[0],
                        ios_versions[1],
                        ios_versions[2]
                    ],
                    default: ios_versions[2]
                }], function (answers) {
                    param_ios_version = answers.param_ios_version;
                    done();
                }.bind(this));

            } else if (param_platforms.indexOf('android') > -1) {
                this.prompt([{
                    type: 'list',
                    name: 'param_android_version',
                    message: 'Select the minimum version of android version:',
                    choices: [
                        android_versions[0],
                        android_versions[1]
                    ],
                    default: android_versions[1]
                }], function (answers) {
                    param_android_version = answers.param_android_version;
                    done();
                }.bind(this));

            } else {
                done();
            }

        }.bind(this));


    } else if (argsLength >= numberOfParams) {

        // Passing all the parameters

        param_app_name = this.arg1;
        param_adaptive_version = this.arg2;
        param_typescript = JSON.parse(this.arg3);
        param_boilerplate = this.arg4;
        param_platforms = (this.arg5 + '').split(',');

    } else {

        // number of parameters incorrect

        this.log(chalk.red('[generator-adaptive] The number of parameters [' + argsLength + '] is not the expected [>=' + numberOfParams + ']'));
        exit(-1);
    }
};

/**
 * Saving configurations and configure the project (creating .editorconfig
 * files and other metadata files)
 */
AdaptiveGenerator.prototype.configuring = function configuring() {

    // Adaptive version
    /*if (param_adaptive_version === 'latest') {
    }*/

    this.log(chalk.green('[generator-adaptive] Saving configurations and configure the project...'));

    // Adaptive Configuration File
    this.fs.copyTpl(
        this.templatePath('_adaptive.yml'),
        this.destinationPath('adaptive.yml'),
        {
            app_name: param_app_name,
            adaptive_version: param_adaptive_version,
            target_ios: param_platforms.indexOf('ios') > -1,
            version_ios: param_ios_version,
            target_android: param_platforms.indexOf('android') > -1,
            version_android: param_android_version
        }
    );

    this.template('_package.json', 'package.json', this, {});
    this.template('_README.md', 'README.md', this, {});
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
    this.copy('bowerrc', '.bowerrc');

    this.fs.copyTpl(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        {typescript: param_typescript}
    );
};

/**
 * Default functions
 */
AdaptiveGenerator.prototype.default = function defaultFunction() {
};

/**
 * Copy folders and resources from the template directory to the
 * output directory
 */
AdaptiveGenerator.prototype.writing = function writing() {

    var srcDir = 'src/';
    var cfgDir = 'config/';
    var distDir = 'dist/';
    var assetsDir = 'assets/';

    var cssDir = 'css/';
    var jsDir = 'js/';
    var fontsDir = 'fonts/';

    this.log(chalk.green('[generator-adaptive] Copying application folders and files...'));

    mkdirp(cfgDir);
    mkdirp(srcDir);
    mkdirp(distDir);
    mkdirp(assetsDir);

    // configs
    this.directory(cfgDir, cfgDir, true);

    // assets
    for (var i = 0; i < param_platforms.length; i++) {
        var dir = assetsDir + param_platforms[i] + path.sep;
        this.directory(dir, dir, true);
    }

    // TODO: remove copy file-to-file and use this.directory(dir, dir, true); instead
    // TODO: simplify all the following code

    var boilerplateSrc = '';

    switch (param_boilerplate) {
        case html5:

            //HTML5 Boilerplate. Boilerplate with the minimum requirement for HTML5 development

            boilerplateSrc = 'html5/';

            // bower dependencies
            this.fs.copyTpl(
                this.templatePath(srcDir + boilerplateSrc + '_bower.json'),
                this.destinationPath('bower.json'),
                {app_name: param_app_name, adaptive_version: param_adaptive_version}
            );

            mkdirp(srcDir + cssDir);
            mkdirp(srcDir + jsDir);

            this.template(srcDir + boilerplateSrc + 'index.html', srcDir + 'index.html', this, {});
            if (param_typescript) {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.ts', srcDir + jsDir + 'main.ts', this, {});
            } else {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.js', srcDir + jsDir + 'main.js', this, {});
            }
            this.template(srcDir + boilerplateSrc + cssDir + 'main.css', srcDir + cssDir + 'main.css', this, {});

            break;

        case mobile:

            //MOBILE Boilerplate. Like HTML5 Boilerplate plus some mobile features


            boilerplateSrc = 'mobile/';

            // bower dependencies
            this.fs.copyTpl(
                this.templatePath(srcDir + boilerplateSrc + '_bower.json'),
                this.destinationPath('bower.json'),
                {app_name: param_app_name, adaptive_version: param_adaptive_version}
            );

            mkdirp(srcDir + cssDir);
            mkdirp(srcDir + jsDir);

            this.template(srcDir + boilerplateSrc + 'index.html', srcDir + 'index.html', this, {});
            this.template(srcDir + boilerplateSrc + 'LICENSE.md', srcDir + 'LICENSE.md', this, {});
            if (param_typescript) {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.ts', srcDir + jsDir + 'main.ts', this, {});
            } else {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.js', srcDir + jsDir + 'main.js', this, {});
            }
            this.template(srcDir + boilerplateSrc + jsDir + 'helper.js', srcDir + jsDir + 'helper.js', this, {});
            this.template(srcDir + boilerplateSrc + cssDir + 'main.css', srcDir + cssDir + 'main.css', this, {});

            break;

        case responsive:


            //RESPONSIVE Boilerplate. Boilerplate for responsive multi-platform purposes


            boilerplateSrc = 'responsive/';

            // bower dependencies
            this.fs.copyTpl(
                this.templatePath(srcDir + boilerplateSrc + '_bower.json'),
                this.destinationPath('bower.json'),
                {app_name: param_app_name, adaptive_version: param_adaptive_version}
            );

            mkdirp(srcDir + cssDir);
            mkdirp(srcDir + jsDir);

            this.template(srcDir + boilerplateSrc + 'index.html', srcDir + 'index.html', this, {});
            if (param_typescript) {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.ts', srcDir + jsDir + 'main.ts', this, {});
            } else {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.js', srcDir + jsDir + 'main.js', this, {});
            }
            this.template(srcDir + boilerplateSrc + cssDir + 'main.css', srcDir + cssDir + 'main.css', this, {});

            break;

        case boostrap:


            //BOOSTRAP Boilerplate


            boilerplateSrc = 'boostrap/';

            // bower dependencies
            this.fs.copyTpl(
                this.templatePath(srcDir + boilerplateSrc + '_bower.json'),
                this.destinationPath('bower.json'),
                {app_name: param_app_name, adaptive_version: param_adaptive_version}
            );

            mkdirp(srcDir + cssDir);
            mkdirp(srcDir + jsDir);
            mkdirp(srcDir + fontsDir);

            this.template(srcDir + boilerplateSrc + 'index.html', srcDir + 'index.html', this, {});
            if (param_typescript) {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.ts', srcDir + jsDir + 'main.ts', this, {});
            } else {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.js', srcDir + jsDir + 'main.js', this, {});
            }
            this.template(srcDir + boilerplateSrc + cssDir + 'main.css', srcDir + cssDir + 'main.css', this, {});

            this.template(srcDir + boilerplateSrc + fontsDir + 'glyphicons-halflings-regular.eot', srcDir + fontsDir + 'glyphicons-halflings-regular.eot', this, {});
            this.template(srcDir + boilerplateSrc + fontsDir + 'glyphicons-halflings-regular.svg', srcDir + fontsDir + 'glyphicons-halflings-regular.svg', this, {});
            this.template(srcDir + boilerplateSrc + fontsDir + 'glyphicons-halflings-regular.ttf', srcDir + fontsDir + 'glyphicons-halflings-regular.ttf', this, {});
            this.template(srcDir + boilerplateSrc + fontsDir + 'glyphicons-halflings-regular.woff', srcDir + fontsDir + 'glyphicons-halflings-regular.woff', this, {});

            break;

        default:


            // NONE BOILERPLATE. Basic index.html with adaptive integration and typescript support (optional)

            boilerplateSrc = 'none/';

            // bower dependencies
            this.fs.copyTpl(
                this.templatePath(srcDir + boilerplateSrc + '_bower.json'),
                this.destinationPath('bower.json'),
                {app_name: param_app_name, adaptive_version: param_adaptive_version}
            );

            mkdirp(srcDir + cssDir);
            mkdirp(srcDir + jsDir);

            this.template(srcDir + boilerplateSrc + 'index.html', srcDir + 'index.html', this, {});
            if (param_typescript) {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.ts', srcDir + jsDir + 'main.ts', this, {});
            } else {
                this.template(srcDir + boilerplateSrc + jsDir + 'main.js', srcDir + jsDir + 'main.js', this, {});
            }
            this.template(srcDir + boilerplateSrc + cssDir + 'reset.css', srcDir + cssDir + 'reset.css', this, {});
            this.template(srcDir + boilerplateSrc + cssDir + 'style.css', srcDir + cssDir + 'style.css', this, {});
    }

};

/**
 * Conflicts manager function
 */
AdaptiveGenerator.prototype.conflicts = function conflicts() {
};

/**
 * Install Node (npm) and Bower dependencies
 * bower install & npm install
 */
AdaptiveGenerator.prototype.install = function installation() {
    this.log(chalk.green('[generator-adaptive] Installing dependencies... ' + install));
    this.installDependencies({skipInstall: !install});
};

/**
 * Ending tasks.
 */
AdaptiveGenerator.prototype.end = function end() {

    if (install && start_nibble) {
        this.spawnCommand('grunt', ['test', 'nibble']);
    }
};
