import { Component } from '@angular/core';
import { DevToolsExtension, NgRedux } from 'ng2-redux';
import { IAppState, rootReducer, middleware, enhancers }
  from './store';
import '../styles/app.scss';
import { DestinationActions } from './actions';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'pa-my-app', // <pa-my-app></pa-my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private destinationActions: DestinationActions
  ) {

    const tools = devTools.isEnabled() ?
      [ ...enhancers, devTools.enhancer() ] : enhancers;

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      tools
    );

    this.destinationActions.resetDestination();
  }

}
