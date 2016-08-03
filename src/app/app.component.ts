import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SpotApiService, GeolocationService, MapLocationService } from './services';
import { HeaderComponent } from './header';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [SpotApiService, GeolocationService, MapLocationService],
  directives: [...ROUTER_DIRECTIVES, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
  }
}
