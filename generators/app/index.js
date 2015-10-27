'use strict';

var generators = require('yeoman-generator');
var colors = require('colors');
var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');
var lib = require('./lib.js');


// Check for the project updates
var notifier = updateNotifier({
  pkg: pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
notifier.notify();


// Extend the base yeoman generator
module.exports = generators.Base.extend({

  /**
   * Entry Point. Constructor of the generator
   */
  constructor: function () {

    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // arguments
    //this.argument('app_name', {type: String, required: false, desc: 'Your project name. ex: myapp'});
    //this.argument('app_id', {type: String, required: false, desc: 'Application Identifier. ex: com.company'});

    // options
    this.option('name', {type: String, desc: 'Your project name. ex: myapp'});
    this.option('appid', {type: String, desc: 'Application identifier. ex: com.company'});

  },

  /**
   * Your initialization methods
   */
  initializing: function () {

    this.log(('Starting generator...').green);
  },

  /**
   * Where you prompt users for options
   */
  prompting: function () {

    var done = this.async();

    var prompts = [];

    // Check if the options are passed or use the prompt
    if (!this.options.name) {
      prompts.push({
        type: 'input',
        name: 'name',
        validate: lib.validateString,
        message: 'What is the name of your application?',
        default: this.appname // Default to current folder name
      });
    } else {
      if (lib.validateString(this.options.name) !== true) {
        this.log(('ERROR: {name} ' + lib.validateString(this.options.name)).red);
        process.exit(1);
      }
    }
    if (!this.options.appid) {
      prompts.push({
        type: 'input',
        name: 'appid',
        validate: lib.validatePackage,
        message: 'What is the application identifier of your application?',
        default: 'com.company'
      });
    } else {
      if (lib.validatePackage(this.options.appid) != true) {
        this.log(lib.validatePackage(this.options.appid));
        process.exit(1);
      }
    }

    this.prompt(prompts, function (answers) {

      // Store the values of the input values
      this.name = this.options.name || answers.name;
      this.appid = this.options.appid || answers.appid;
      done();

    }.bind(this));
  },

  /**
   * Saving configurations and configure the project
   */
  configuring: function () {
  },

  /**
   * If the method name doesn't match a priority, it will be pushed to this group.
   */
  default: function () {

    this.log((this.name).green);
    this.log((this.appid).green);
  },

  /**
   * Where you write the generator specific files
   */
  writing: function () {
  },

  /**
   * Where you write the generator specific files
   */
  conflicts: function () {
  },

  /**
   * Where installation are run
   */
  install: function () {
  },

  /**
   * Called last, cleanup, say good bye, etc
   */
  end: function () {
  }
});
