import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Redux
import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { ACTION_PROVIDERS } from './actions';

// NgMaterial
import {
  MatButtonModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatIconModule,
  MatCheckboxModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatInputModule
} from '@angular/material';

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
  EditComponent,
  AddEditButtonComponent,
  HelpComponent,
  InfoComponent
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
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatInputModule,
    // Firebase
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    InfoComponent,
    HeaderComponent,
    SpotsListComponent,
    DrawerComponent,
    PlacesComponent,
    RulesInfoComponent,
    MapComponent,
    MapGLComponent,
    MapControlsComponent,
    AddSpotComponent,
    AddEditButtonComponent,
    MetersToFeetPipe,
    EditComponent
  ],
  providers: [
    DevToolsExtension,
    SpotsDatabaseService,
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
