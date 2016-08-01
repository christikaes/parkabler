import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

function startBootstrap() {
  bootstrap(AppComponent, [
      // These are dependencies of our App
      HTTP_PROVIDERS,
      APP_ROUTER_PROVIDERS,
      disableDeprecatedForms(), // Use angular/forms
      provideForms(),
      { provide: LocationStrategy, useClass: HashLocationStrategy }, // use #/ routes, remove this for HTML5 mode
      FIREBASE_PROVIDERS, // Initialize Firebase app
      defaultFirebase({
        apiKey: "AIzaSyABlDFTj5lUcR9e_I2ZzrB6D26c5FU9mE8",
        authDomain: "parkabler.firebaseapp.com",
        databaseURL: "https://parkabler.firebaseio.com",
        storageBucket: "parkabler.appspot.com"
      })
    ])
    .catch(err => console.error(err));
}

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

// if cordova
if (window.cordova) {
  // wait for device ready if cordova
  document.addEventListener('deviceready', startBootstrap, false);
} else { // else just start
  startBootstrap();
}
