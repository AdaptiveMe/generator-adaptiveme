'use strict';

// Node dependencies
var fs = require('fs.extra');

// Npm dependencies
var generators = require('yeoman-generator');
var colors = require('colors');
var updateNotifier = require('update-notifier');
var AdmZip = require('adm-zip');
var request = require('request');
var requestSync = require('sync-request');
var ncp = require('ncp').ncp;
var replace = require('replace');
var emptyDir = require('empty-dir');

// Custom dependencies
var pkg = require('../../package.json');
var lib = require('./lib.js');


// Check for the project updates
var notifier = updateNotifier({
  pkg: pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
notifier.notify();

var boilerplates = [];
var downloadBoilerplate = '';

// Extend the base yeoman generator
module.exports = generators.Base.extend({

  /**
   * Entry Point. Constructor of the generator
   */
  constructor: function () {

    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // options
    this.option('name', {type: String, desc: 'Your project name. ex: myapp', default: 'myapp'});
    this.option('appid', {type: String, desc: 'Application identifier. ex: com.company'});
    this.option('boilerplate', {type: String, desc: 'Application boilerplate. ex: bootstrap'});

  },

  /**
   * Your initialization methods
   */
  initializing: function () {

    this.log(('Starting generator...').green);

    if (!emptyDir.sync('./')) {
      this.log(('ERROR: The current is not empty. Please remove all the files.').red);
      process.exit(1);
    }
  },

  /**
   * Where you prompt users for options
   */
  prompting: function () {

    // ------------------------------------------------------------------------------
    // PROMPT
    // ------------------------------------------------------------------------------

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
      // Validate the options
      if (lib.validateString(this.options.name) !== true) {
        this.log(('ERROR: {name} ' + lib.validateString(this.options.name)).red);
        process.exit(1);
      } else if (this.options.name === true) {
        this.log(('ERROR: {name} You should append some value to the option').red);
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
      // Validate the options
      if (lib.validatePackage(this.options.appid) != true) {
        this.log(lib.validatePackage(this.options.appid));
        process.exit(1);
      } else if (this.options.appid === true) {
        this.log(('ERROR: {appid} You should append some value to the option').red);
        process.exit(1);
      }
    }

    // Request for the available Boilerplates on the Adaptive Community
    var res = requestSync('GET', 'http://app.adaptive.me/api/env/boilerplates');

    if (res.error) {
      self.log(('ERROR querying the boilerplates: ' + error).red);
      process.exit(1);
    } else if (res.statusCode != 200) {
      self.log(('ERROR (' + res.statusCode + ') querying the boilerplates: ' + error).red);
      process.exit(1);
    } else {

      var boilers = [];
      JSON.parse(res.body).forEach(function (item) {
        boilerplates.push(item);
        boilers.push(item.name.replace('adaptive-boilerplate-', ''));
      });
    }

    if (!this.options.boilerplate) {

      // Generate a list for selecting the boilerplate
      prompts.push({
        type: 'list',
        name: 'boilerplate',
        message: 'Boilerplate to initialize the application:',
        choices: boilers
      });

    } else {

      // Validate the option
      if (boilers.indexOf(this.options.boilerplate) < 0) {
        this.log(('The selected boilerplate is not defined in the platform.').red);
        this.log(('Available options: ' + boilers).red);
        process.exit(1);
      }
    }

    this.prompt(prompts, function (answers) {

      // Store the values of the input values
      this.name = this.options.name || answers.name;
      this.appid = this.options.appid || answers.appid;
      this.boilerplate = this.options.boilerplate || answers.boilerplate;
      done();

    }.bind(this));
  },

  /**
   * Saving configurations and configure the project
   */
  configuring: function () {

    var self = this;

    this.log('Downloading the common files for the boilerplate ...'.green);

    // ------------------------------------------------------------------------------
    // COMMON
    // ------------------------------------------------------------------------------

    var done = this.async();

    // Request for getting the common files for the generator
    var req = request
      .get('https://github.com/AdaptiveCommunity/adaptive-common-boilerplate/archive/master.zip')
      .pipe(fs.createWriteStream('archive.zip')
        .on('error', function (error) {
          self.log((error + '').red);
          process.exit(1);
        }));
    req.on('error', function (error) {
      self.log((error + '').red);
      process.exit(1);
    });
    req.on('close', function () {

      // Unzipping the contents of the zip downloaded from gitHub
      var zip = new AdmZip('archive.zip');
      zip.extractAllTo(process.cwd(), true);

      // Move the contents of the unzipped folder to pwd
      ncp('adaptive-common-boilerplate-master', '.', function (err) {
        if (err) {
          self.log((error + '').red);
          process.exit(1);
        }

        done();
      });
    });

  },

  /**
   * If the method name doesn't match a priority, it will be pushed to this group.
   */
  default: function () {

    var self = this;

    var done = this.async();

    // ------------------------------------------------------------------------------
    // BOILERPLATE
    // ------------------------------------------------------------------------------

    // TODO: download boilerplate

    self.log('Downloading the specific files for this boilerplate ...'.green);

    boilerplates.forEach(function (entry) {
      if (entry.name === 'adaptive-boilerplate-' + self.boilerplate) {
        downloadBoilerplate = entry;
      }
    });

    // Request for getting the specific files for the generator
    var req = request
      .get(downloadBoilerplate.download_url)
      .pipe(fs.createWriteStream('boilerplate.zip')
        .on('error', function (error) {
          self.log((error + '').red);
          process.exit(1);
        }));
    req.on('error', function (error) {
      self.log((error + '').red);
      process.exit(1);
    });
    req.on('close', function () {

      // Unzipping the contents of the zip downloaded from gitHub
      var zip = new AdmZip('boilerplate.zip');
      zip.extractAllTo(process.cwd(), true);

      // Move the contents of the unzipped folder to pwd
      ncp(downloadBoilerplate.name + '-master', '.', function (err) {
        if (err) {
          self.log((error + '').red);
          process.exit(1);
        }

        done();
      });
    });

  },

  /**
   * Where you write the generator specific files
   */
  writing: function () {

    var self = this;

    var done = this.async();

    // ------------------------------------------------------------------------------
    // ASSETS
    // ------------------------------------------------------------------------------

    this.log('Downloading the common assets for the platforms ...'.green);

    // Request for getting the common assets for the generator
    var req = request
      .get('https://github.com/AdaptiveCommunity/adaptive-common-assets/archive/master.zip')
      .pipe(fs.createWriteStream('assets.zip')
        .on('error', function (error) {
          self.log((error + '').red);
          process.exit(1);
        }));
    req.on('error', function (error) {
      self.log((error + '').red);
      process.exit(1);
    });
    req.on('close', function () {

      // Unzipping the contents of the zip downloaded from gitHub
      var zip = new AdmZip('assets.zip');
      zip.extractAllTo(process.cwd(), true);

      fs.renameSync('adaptive-common-assets-master', 'assets');

      done();
    });

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

    // Replace the variables inside the files
    try {
      replace({regex: '<%= name %>', replacement: this.name, paths: ['.'], recursive: true, silent: true});
      replace({regex: '<%= appid %>', replacement: this.appid, paths: ['.'], recursive: true, silent: true});

      // Request for the latest version of adaptive-arp-api
      var res = requestSync('GET', 'http://app.adaptive.me/api/env/version/adaptive/latest');

      if (res.error) {
        self.log(('ERROR querying the latest version of adaptive: ' + error).red);
        process.exit(1);
      } else if (res.statusCode != 200) {
        self.log(('ERROR (' + res.statusCode + ') querying the latest version of adaptive: ' + error).red);
        process.exit(1);
      } else {
        replace({regex: '<%= engineversion %>', replacement: res.body, paths: ['.'], recursive: true, silent: true});
      }

    } catch (e) {
      this.log(('ERROR: There is an error replacing the tokens inside the files (' + e.message + ')').red);
      process.exit(1);
    }

    !this.options.skipInstall ? this.log('Installing dependencies...'.green) : '';
    this.installDependencies();
  },

  /**
   * Called last, cleanup, say good bye, etc
   */
  end: function () {


    // TODO: replace the engine version quering the api for the value

    // Remove the downloaded components
    try {
      fs.rmrfSync('adaptive-common-boilerplate-master');
      fs.rmrfSync(downloadBoilerplate.name + '-master');

      fs.rmrfSync('archive.zip');
      fs.rmrfSync('boilerplate.zip');
      fs.rmrfSync('assets.zip');

      fs.rmrfSync('assets/LICENSE');
      fs.rmrfSync('assets/README.md');
    } catch (e) {
      this.log(('ERROR: There is an error removing the unnecessary files from the file system (' +
      e.message + ')').red);
      process.exit(1);
    }

    this.log('All done! You can enjoy developing into the Adaptive Platform!'.green);
  }
});
