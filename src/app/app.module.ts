import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgReduxModule, DevToolsExtension} from 'ng2-redux';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { MaterialModule } from '@angular/material';

// import { AngularFireModule } from 'angularfire2';

// Components
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  EditSpotComponent,
  MapControlsComponent,
  SpotsListComponent,
  MapComponent,
  PlacesComponent
} from './components';

// Pages
import {
  HomeComponent,
  RulesInfoComponent,
  TextComponent
} from './pages';

// Services
import {
  MapLocationService,
  GeolocationService,
  SpotApiService,
  DestinationLocationService,
  DistanceService,
  RulesInfoService,
  EditSpotStateService
} from './services';

// Actions
import { ACTION_PROVIDERS } from './actions';

// Router
import { routing } from './app.routing';


export const firebaseConfig = {
  apiKey: 'AIzaSyABlDFTj5lUcR9e_I2ZzrB6D26c5FU9mE8',
  authDomain: 'parkabler.firebaseapp.com',
  databaseURL: 'https://parkabler.firebaseio.com',
  storageBucket: 'parkabler.appspot.com'
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    // Material
    MaterialModule.forRoot(),
    // Firebase
    // AngularFireModule.initializeApp(firebaseConfig),
    // Routing
    routing,
    NgReduxModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EditSpotComponent,
    MapControlsComponent,
    SpotsListComponent,
    MapComponent,
    PlacesComponent,
    TextComponent,
    RulesInfoComponent
  ],
  providers: [
    DevToolsExtension,
    MapLocationService,
    GeolocationService,
    SpotApiService,
    DestinationLocationService,
    DistanceService,
    RulesInfoService,
    EditSpotStateService,
    ACTION_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
