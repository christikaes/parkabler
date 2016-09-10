import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

function startBootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

export function main() {
  if (!window.cordova) {
    return startBootstrap();
  } else {
    // wait for device ready if cordova
    document.addEventListener('deviceready', startBootstrap, false);
  }
}

if (document.readyState === 'complete') {
    main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
