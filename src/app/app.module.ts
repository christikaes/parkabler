import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Redux
import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { ACTION_PROVIDERS } from './actions';

// NgMaterial
import { MaterialModule } from '@angular/material';

// NgFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
  AddSpotComponent,
  AddSpotButtonComponent,
  ReportSpotComponent,
  StepperComponent,
  StepComponent,
  HelpComponent
} from './components';

// Pages
import {
  HomeComponent,
  RulesInfoComponent
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
    MaterialModule,
    BrowserAnimationsModule,
    // Firebase
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    HeaderComponent,
    SpotsListComponent,
    DrawerComponent,
    PlacesComponent,
    RulesInfoComponent,
    MapComponent,
    MapGLComponent,
    MapControlsComponent,
    AddSpotComponent,
    AddSpotButtonComponent,
    ReportSpotComponent,
    StepComponent,
    StepperComponent,
    MetersToFeetPipe
  ],
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
  constructor() { }
}
