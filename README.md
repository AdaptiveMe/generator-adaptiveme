# Adaptive App Generator for Yeoman 
[![Build Status](https://travis-ci.org/AdaptiveMe/generator-adaptiveme.svg?branch=master)](https://travis-ci.org/AdaptiveMe/generator-adaptiveme)
[![GitHub tag](https://img.shields.io/github/tag/AdaptiveMe/generator-adaptiveme.svg)](https://github.com/AdaptiveMe/generator-adaptiveme) 
[![Adaptive Generator for Yeoman](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/generator-adaptiveme) 
[![Adaptive Generator for Yeoman](https://img.shields.io/node/v/gh-badges.svg)](https://www.npmjs.com/package/generator-adaptiveme) [![Dependency Status](https://david-dm.org/AdaptiveMe/generator-adaptiveme.svg)](https://david-dm.org/AdaptiveMe/generator-adaptiveme) [![devDependency Status](https://david-dm.org/AdaptiveMe/generator-adaptiveme/dev-status.svg)](https://david-dm.org/AdaptiveMe/generator-adaptiveme#info=devDependencies)
[![License](https://img.shields.io/badge/license-apache%202-blue.svg)](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE) 
[![Adaptive Generator for Yeoman](https://img.shields.io/badge/devtools-yeoman-yellow.svg)](https://github.com/AdaptiveMe/generator-adaptiveme) [![adaptive.me](https://img.shields.io/badge/adaptive-me-fdcb0e.svg)](http://adaptive.me)

[![Adaptive Runtime Platform](https://raw.githubusercontent.com/AdaptiveMe/AdaptiveMe.github.io/master/assets/logos/normal/Logo-devtools-for-Yeoman.png)](#)

## Introduction

### About This Project

Adaptive App Generator is an scaffolding tool for generating HTML5 applications ready for the Adaptive Runtime Platform.

## Use It

### Installation

* You should be a developer and, being a developer, you should have git installed on your machine. If you're either a noob or from the past, please install git on your machine before proceeding: :smile:
  * For Windows: [download here](http://bfy.tw/1rHG)
  * For Mac OSX: [download here](http://bfy.tw/1rHJ)
  * For Linux: [download here](http://bfy.tw/1rHM)
* You should have NodeJS installed on your machine before proceeding with the installation. If you don't have it, please download it from [here](https://nodejs.org/) for your platform. 
	* If you don't know whether you have it installed, open up a ```terminal``` and issue the following command ```node -v```.
	* The above command should respond with at least the following NodeJS version ```v0.12.0``` or ```v4.0.0```.
* Install the tools for running the generator and the generator

  ```  
  [sudo] npm install -g yo bower grunt grunt-cli
  [sudo] npm install npm-adaptiveme-nibble generator-adaptiveme
  ```

* The installer will download everything you need to run Adaptive App Generator.
	
### Running

To create an application you should create a working folder where the generate will download all the necessary files for starting the application.

  ```
  mkdir {app_name}
  cd {app_name}
  yo adaptiveme
  ```

* When you run the generator, the program will launch some prompt in order to configure your application.
	* **What is the base name of your application?** Base name of the application, by default is the running folder's name
	* **What version of Adaptive library want to use?** Select the version of ARP you want to use. By default is the latest
	* **Do you want to add Typescript support to the project?** Select if you want Typescript support for the application. Highly recomended
	* **Select one boilerplate to initialize the application:**
		* **HTML5 Boilerplate** Empty application with some HTML5 features (CSS normalization, Modernizr) - http://demo.html5boilerplate.com/
		* **Mobile HTML5 Boilerplate** Simple Mobile Application Boilerplate (jQuery, CSS normalization, Mobile Optimizations) - https://html5boilerplate.com/mobile/
		* **Initializr Responsive** Responsive Boilerplate for creating multi-device applications (CSS normalization, Modernizr) - http://www.initializr.com/try
		* **Initializr Boostrap** Boilerplate template for creating applications with boostrap (Boostrap) - http://getbootstrap.com/examples/jumbotron/
	* **Select the supported platforms:** (multiselect) Select all the platforms for configuring the graphical assets to copy
 		* **android**
	* **What is the application identifier?** Application Identifier for online stores
	* **Select the minimum version of {os_name} version?** Select the minimum version of the {os_name} version
* Once the generation is finished, you can use some features for development:
	* ```grunt nibble``` Runs a nibble emulator on the source folder in order to emulate your application on a device
	* ```grunt test``` Execute Javascript and CSS testing for your application
	* ```grunt dist``` Prepares your application for distribution. The output result will be on **dist** folder

* Please report issues/wants/needs [here](https://github.com/AdaptiveMe/generator-adaptiveme/issues) clearly stating your platform and screenshots (whenever possible).

#### Non-interactive mode

For running the generator without the interactive mode you could run it with a single command. You should have previous knoledge of the generator. Here's an example:

  ```
  yo adaptiveme test latest false "Initializr Bootstrap" "android" me.adaptive.arp --android-version=5.1 --skip-install
  ```

### Updating
* Updating your **generator-adaptiveme** installation.

  ```
  [sudo] npm up generator-adaptiveme -g
  ```

### About Adaptive Runtime Platform

Hybrid apps are applications that are built using HTML5/CSS3/JavaScript web technologies and use a native "containers" to package the app to enable access to the native functionalities of a device. In essence, you can write a rich mobile/wearable/tv application using HTML and JavaScript and package that application as a native app for multiple mobile/wearable/tv platforms and distribute them on the different app stores and markets.

The Adaptive Runtime Platform (ARP) provides these native "containers" to package apps for the main mobile, wearable and desktop platforms... and other platforms as they emerge. Adaptive Runtime Platform (ARP) and sub-projects are open-source under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). The Adaptive Runtime Platform (ARP) project was created by [Carlos Lozano Diez](https://github.com/carloslozano) as part of the [adaptive.me](http://adaptive.me) set of products.

Please refer to the [project site](http://adaptiveme.github.io) for more information.

## Work Backlog

#### Board: [![Stories in Ready](https://badge.waffle.io/AdaptiveMe/generator-adaptiveme.svg?label=ready&title=Ready)](https://waffle.io/AdaptiveMe/generator-adaptiveme)

[![Throughput Graph](https://graphs.waffle.io/AdaptiveMe/generator-adaptiveme/throughput.svg)](https://waffle.io/AdaptiveMe/generator-adaptiveme/metrics)

## Contributing

We'd *love to accept your patches and contributions to this project*.  There are a just a few small guidelines you need to follow to ensure that you and/or your company and our project are safeguarded from inadvertent copyright infringement. I know, this can be a pain but we want fair-play from the very start so that we're all on the same page. Please refer to the [project site](http://adaptiveme.github.io) for more information.

## Attributions

* Adaptive Runtime Platform (ARP) artwork by [Jennifer Lasso](https://github.com/Jlassob).
* Project badge artwork by [shields.io](http://shields.io/).
* All other logos are copyright of their respective owners.

## License
All the source code of the Adaptive Runtime Platform (ARP), including all Adaptive Runtime Platform (ARP) sub-projects curated by [Carlos Lozano Diez](https://github.com/carloslozano), are distributed, and must be contributed to, under the terms of the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). The [license](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE) is included in this [repository](https://raw.githubusercontent.com/AdaptiveMe/adaptive-arp-api/master/LICENSE).

Forged with :heart: in Barcelona, Catalonia · © 2013 - 2015 [adaptive.me](http://adaptive.me) / [Carlos Lozano Diez](http://google.com/+CarlosLozano).

