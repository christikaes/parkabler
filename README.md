[![Stories in Ready](https://badge.waffle.io/christinakayastha/parkable.png?label=ready&title=Ready)](https://waffle.io/christinakayastha/parkable)
[![Stories in Progress](https://badge.waffle.io/christinakayastha/parkable.png?label=in%20progress&title=In%20Progress)](https://waffle.io/christinakayastha/parkable)
# ParkAbler

Mockup: https://www.youtube.com/watch?time_continue=78&v=1AbLbqd4E8o

Old ios version:
https://www.youtube.com/watch?v=jlJs5QWENng


List of components:
* AppBar
** Help part of this
* PlacesSearch
* Map
* Add/remove spots


This is an app that shows parking spot availability in real time.

The following stack is used:
* Angular2
* Angular Material2 (useful resource: https://github.com/angular/material2/tree/master/src/demo-app)
* Firebase 2
* Google Maps
* PhoneGap


There are several branches, most contain old work (react version, meteor version, angular 1 version).
The App branch contains the phonegap app that is used to generate the built apps.

Currently the database contains info about parking spots in Boston. The information is crowd sourced.

===

This project was based off of angular2-webpack (https://github.com/preboot/angular2-webpack/blob/master/package.json)

## Running the app

After you have installed all dependencies you can now run the app with:

```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Build files

* single run: `npm run build`
* build files and watch: `npm run watch`

### Build phonegap

* run: `npm run phonegap`
* prepare: `cordova prepare` if plugins and platforms folder does not exist
* go into the phonegap directory and build phonegap: `cd phonegap` `cordova run android`

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

#### 2. End-to-End Tests (aka. e2e, integration)

* single run:
  * in a tab, *if not already running!*: `npm start`
  * in a new tab: `npm run webdriver-start`
  * in another new tab: `npm run e2e`
* interactive mode:
  * instead of the last command above, you can run: `npm run e2e-live`
  * when debugging or first writing test suites, you may find it helpful to try out Protractor commands without starting up the entire test suite. You can do this with the element explorer.
  * you can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

## Deploying
The app is hosted on gh-pages. To publish the app:
* Checkout master
* Make sure you have nothing in the workspace (important!)
* Run `npm run publish`
** This will push a new build to gh-pages 

## Documentation

You can generate api docs (using [TypeDoc](http://typedoc.io/)) for your code with the following:
```bash
npm run docs
```
