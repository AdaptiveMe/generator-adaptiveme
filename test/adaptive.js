'use strict';

var lib = require('../generators/app/lib.js');
var expect = require('expect.js');
var request = require('request');
var colors = require('colors');
var path = require('path');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;


describe('Adaptive generator', function () {

  this.timeout(30000); // Increase the default timeout

  // Test the connection with the Adaptive Host
  it('Adaptive Cloud API Host', function (done) {

    request.get(lib.host, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  // Test the generator
  it('Adaptive Yeoman generator', function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test',
        appid: 'com.test',
        boilerplate: 'basic'
      })
      .on('end', function () {
        assert.file(['Gruntfile.js', 'adaptive.yml', 'bower.json',
          'package.json']);
        assert.fileContent('adaptive.yml', /platforms/);
        assert.equal(true, fs.lstatSync('assets').isDirectory(), 'There is no assets folder');
        assert.equal(true, fs.lstatSync('config').isDirectory(), 'There is no config folder');
        assert.equal(true, fs.lstatSync('src').isDirectory(), 'There is no src folder');
        done();
      });
  });


});
