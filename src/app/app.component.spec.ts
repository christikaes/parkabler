import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

// to use Translate Service, we need Http, and to test Http we need to mock the backend
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { provide } from '@angular/core';

// Load the implementations that should be tested
import { SpotApiService } from './shared';
import { AppComponent } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent,
    SpotApiService,
    BaseRequestOptions,
    MockBackend,
    // Provide a mocked (fake) backend for Http
    provide(Http, {
      useFactory: function useFactory(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  it('should have tests', inject([AppComponent], (app: AppComponent) => {
    //Write tests
  }));

});
