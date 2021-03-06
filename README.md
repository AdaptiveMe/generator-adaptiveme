# Adaptive App Generator for Yeoman 

[![Build Status](http://i.4dp.me/travis/AdaptiveMe/generator-adaptiveme.svg?branch=master)](https://travis-ci.org/AdaptiveMe/generator-adaptiveme)
[![Adaptive Generator Tag](http://i.4dp.me/github/tag/AdaptiveMe/generator-adaptiveme.svg)](https://github.com/AdaptiveMe/generator-adaptiveme/tags) 
[![Adaptive Generator Release](http://i.4dp.me/github/release/AdaptiveMe/generator-adaptiveme.svg)](https://github.com/AdaptiveMe/generator-adaptiveme/releases) 
[![Adaptive Generator npm](http://i.4dp.me/npm/v/generator-adaptiveme.svg)](https://www.npmjs.com/package/generator-adaptiveme) 
[![Dependency Status](http://i.4dp.me/david/AdaptiveMe/generator-adaptiveme.svg)](https://david-dm.org/AdaptiveMe/generator-adaptiveme) 
[![devDependency Status](http://i.4dp.me/david/dev/AdaptiveMe/generator-adaptiveme.svg)](https://david-dm.org/AdaptiveMe/generator-adaptiveme#info=devDependencies)

[![Adaptive Runtime Platform](https://raw.githubusercontent.com/AdaptiveMe/AdaptiveMe.github.io/master/assets_v2/wordmark-adaptive-spectrum-1173x256.png)](#)

Adaptive App Generator is an scaffolding tool for generating HTML5 applications ready for the Adaptive Runtime Platform.

## Dependencies

```  
npm install -g yo bower grunt grunt-cli
```

## Installation

```  
npm install -g generator-adaptiveme
```
	
## Help

```
yo adaptiveme --help
  
Usage:
  yo adaptiveme:app [options]

Options:
  -h,   --help          # Print the generator's options and usage
        --skip-cache    # Do not remember prompt answers             Default: false
        --skip-install  # Do not automatically install dependencies  Default: false
        --name          # Your project name. ex: myapp
        --appid         # Application identifier. ex: com.company
        --boilerplate   # Application boilerplate. ex: bootstrap
```
	
## Running (Interactive Mode)

To create an application you should create a working folder where the generate will download all the necessary files for starting the application. When you run the generator, the program will launch some prompt in order to configure your application.

```
mkdir {app_name}
cd {app_name}
  
yo adaptiveme
```
  
Once the generation is finished, you can use some features for development:
* ```grunt test``` Execute Javascript and CSS testing for your application
* ```grunt dist``` Prepares your application for distribution. The output result will be on **dist** folder

Please report issues/wants/needs [here](https://github.com/AdaptiveMe/generator-adaptiveme/issues) clearly stating your platform and screenshots (whenever possible).

## Running (Non-interactive mode)

For running the generator without the interactive mode you could run it with a single command. You should have previous knoledge of the generator. Here's an example:

```
mkdir {app_name}
cd {app_name}
  
yo adaptiveme --name=myapp --appid=com.example --boilerplate=basic --skip-install
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
