import { Component } from '@angular/core';
import { DevToolsExtension, NgRedux } from 'ng2-redux';
import { IAppState, rootReducer, middleware, enhancers } from './store';
import '../styles/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'pa-app', // <pa-app></pa-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension
  ) {

    const tools = devTools.isEnabled() ?
      [ ...enhancers, devTools.enhancer() ] : enhancers;

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      tools
    );
  }
}
