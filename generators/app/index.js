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
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var util = require('util');
var install = true;
var server = true;
var param_app_name = '';
var param_adaptive_version = 'latest';
var param_typescript = false;

module.exports = AdaptiveGenerator;

/**
 * Adaptive app generator constructor. Read attributes, options, etc...
 */
function AdaptiveGenerator(args, options, config) {

  yeoman.generators.Base.apply(this, arguments);

  // arguments
  this.argument('arg1', {type: String, required: false, optional: true, desc: 'Your project name'});
  this.argument('arg2', {type: String, required: false, optional: true, desc: 'Adaptive Javascript Library version (defaults = latest)'});
  this.argument('arg3', {type: Boolean, required: false, optional: true, desc: 'Add typescript support'});

  // options
  this.option('skip-install', {type: Boolean, desc: 'Skip dependencies installation', defaults: false});
  this.option('skip-server', {type: Boolean, desc: 'Skip starting the http server', defaults: false});

}

util.inherits(AdaptiveGenerator, yeoman.generators.Base);

/**
 * Prints a header for the script
 */
AdaptiveGenerator.prototype.initializing = function initializing() {

  var welcome =
    chalk.cyan.bold("\n....###....########.....###....########..########.####.##.....##.########") +
    chalk.cyan.bold("\n...##.##...##.....##...##.##...##.....##....##.....##..##.....##.##......") +
    chalk.cyan.bold("\n..##...##..##.....##..##...##..##.....##....##.....##..##.....##.##......") +
    chalk.cyan.bold("\n.##.....##.##.....##.##.....##.########.....##.....##..##.....##.######..") +
    chalk.cyan.bold("\n.#########.##.....##.#########.##...........##.....##...##...##..##......") +
    chalk.cyan.bold("\n.##.....##.##.....##.##.....##.##...........##.....##....##.##...##......") +
    chalk.cyan.bold("\n.##.....##.########..##.....##.##...........##....####....###....########") +
    "\n";

  console.log(welcome);

  this.log(chalk.green("[generator-adaptive] Starting generator..."));


  if (this.options['skip-install']) {
    install = false
  }
  if (this.options['skip-server']) {
    server = false
  }
};

/**
 * Prompts questions to the user in order to configurate the application
 */
AdaptiveGenerator.prototype.prompting = function prompting() {

  // Check if the application_name is defined
  if (typeof this.arg1 == 'undefined' || typeof this.arg2 == 'undefined' || typeof this.arg3 == 'undefined') {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'name',
      validate: function (input) {
        if (/^([a-zA-Z0-9_]*)$/.test(input)) {
          param_app_name = input;
          return true;
        }
        return 'Your application name cannot contain special characters or a blank space, using the default name instead';
      },
      message: 'What is the base name of your application?',
      default: this.appname
    },{
      type: 'input',
      name: 'version',
      validate: function (input) {
        if (/^v([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/.test(input) || input == "latest") {
          param_adaptive_version = input;
          return true;
        } else {
          return 'The version of the library has to follow the Semantic Versioning (http://semver.org/) ';
        }
      },
      message: 'What version of Adaptive library want to use?',
      default: param_adaptive_version
    },{
      type: 'confirm',
      name: 'param_typescript',
      message: 'Do you want to add Typescript support to the project?',
      default: param_typescript
    }], function (answers) {

      param_typescript = answers.param_typescript;

      done();
    }.bind(this));
  } else {
    param_app_name = this.arg1;
    param_adaptive_version = this.arg2;
    param_typescript = this.arg3;
  }
};

/**
 * Saving configurations and configure the project (creating .editorconfig
 * files and other metadata files)
 */
AdaptiveGenerator.prototype.configuring = function configuring() {

  this.log(chalk.green("[generator-adaptive] Saving configurations and configure the project..."));

  this.template('_package.json', 'package.json', this, {});
  this.fs.copyTpl(
    this.templatePath('_bower.json'),
    this.destinationPath('bower.json'),
    { app_name: param_app_name, adaptive_version : param_adaptive_version }
  );
  this.template('_README.md', 'README.md', this, {});
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');

  this.fs.copyTpl(
    this.templatePath('Gruntfile.js'),
    this.destinationPath('Gruntfile.js'),
    { 'typescript': param_typescript }
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

  var defDir = 'definitions/';
  var valDir = 'validators/';

  var cssDir = 'css/';
  var jsDir = 'js/';
  var imgDir = 'images/';

  this.log(chalk.green("[generator-adaptive] Copying application folders and files..."));

  this.mkdir(cfgDir);
  this.mkdir(cfgDir + defDir);
  this.mkdir(cfgDir + valDir);

  this.template(cfgDir + defDir + 'i18n-config.xsd', cfgDir + defDir + 'i18n-config.xsd', this, {});
  this.template(cfgDir + defDir + 'io-config.xsd', cfgDir + defDir + 'io-config.xsd', this, {});
  this.template(cfgDir + valDir + 'csslintrc', cfgDir + valDir + '.csslintrc', this, {});
  this.template(cfgDir + valDir + 'jshintrc', cfgDir + valDir + '.jshintrc', this, {});
  this.template(cfgDir + 'en-EN.plist', cfgDir + 'en-EN.plist', this, {});
  this.template(cfgDir + 'i18n-config.xml', cfgDir + 'i18n-config.xml', this, {});
  this.template(cfgDir + 'io-config.xml', cfgDir + 'io-config.xml', this, {});

  this.mkdir(srcDir);
  this.mkdir(srcDir + cssDir);
  this.mkdir(srcDir + jsDir);
  this.mkdir(srcDir + imgDir);

  this.template(srcDir + 'index.html', srcDir + 'index.html', this, {});
  if (param_typescript) {
    this.template(srcDir + jsDir + 'main.ts', srcDir + jsDir + 'main.ts', this, {});
  } else {
    this.template(srcDir + jsDir + 'main.js', srcDir + jsDir + 'main.js', this, {});
  }
  this.template(srcDir + cssDir + 'reset.css', srcDir + cssDir + 'reset.css', this, {});
  this.template(srcDir + cssDir + 'style.css', srcDir + cssDir + 'style.css', this, {});

  this.mkdir(distDir);
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
  this.log(chalk.green("[generator-adaptive] Installing dependencies... " + install));
  this.installDependencies({skipInstall: !install});
};

/**
 * Ending tasks.
 */
AdaptiveGenerator.prototype.end = function end() {

  if (install && server) {
    // Execute grunt task
    this.spawnCommand('grunt', ['test', 'server']);
  }
};
