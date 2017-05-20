// TODO-rangle: is there a good way to break this file up? it's really long /:

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// Redux
import { NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { ACTION_PROVIDERS } from './actions';

// NgMaterial
import { MaterialModule } from '@angular/material';

// NgFire
import { AngularFireModule } from 'angularfire2';
const firebaseConfig = {
  apiKey: 'AIzaSyABlDFTj5lUcR9e_I2ZzrB6D26c5FU9mE8',
  authDomain: 'parkabler.firebaseapp.com',
  databaseURL: 'https://parkabler.firebaseio.com',
  storageBucket: 'parkabler.appspot.com'
};

// Components
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  SpotsListComponent,
  DrawerComponent,
  PlacesComponent,
  MapComponent,
  MapGLComponent,
  MapControlsComponent,
  TutorialComponent,
  TutorialDialogComponent,
  AddSpotComponent,
  AddSpotButtonComponent,
  AddSpotDrawerComponent,
  AddSpotOverlayComponent,
  ReportSpotComponent,
  StepperComponent,
  StepComponent
} from './components';

// Pages
import {
  HomeComponent,
  RulesInfoComponent,
  TextComponent
} from './pages';

// Services
import {
  GeolocationService,
  SpotsDatabaseService,
  AddSpotsService,
  DistanceService,
  RulesInfoService,
  PlacesService
} from './services';

// Router
import { routing } from './app.routing';

// Pipes
import { MetersToFeetPipe } from './pipes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    // Redux
    NgReduxModule,
    // Material
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    // Firebase
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SpotsListComponent,
    DrawerComponent,
    PlacesComponent,
    TextComponent,
    RulesInfoComponent,
    MapComponent,
    MapGLComponent,
    MapControlsComponent,
    TutorialComponent,
    TutorialDialogComponent,
    AddSpotComponent,
    AddSpotButtonComponent,
    AddSpotDrawerComponent,
    AddSpotOverlayComponent,
    ReportSpotComponent,
    StepComponent,
    StepperComponent,
    MetersToFeetPipe
  ],
  entryComponents: [TutorialDialogComponent],
  providers: [
    DevToolsExtension,
    SpotsDatabaseService,
    AddSpotsService,
    DistanceService,
    RulesInfoService,
    PlacesService,
    ACTION_PROVIDERS,
    GeolocationService
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
