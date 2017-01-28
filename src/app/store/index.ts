const createLogger = require('redux-logger');
const persistState = require('redux-localstorage');

import { IAppState, rootReducer } from './store';
import { ISpots, Position, INearbySpot, INearbySpots }
  from './reducers';

export {
  IAppState,
  ISpots,
  Position,
  rootReducer,
  INearbySpot,
  INearbySpots
};

export let middleware = [];
export let enhancers = [
  persistState('spots', { key: 'parkabler/app/state' })
];

// Enable logger for dev mode
if (process.env.ENV === 'server') {
  middleware.push(
    createLogger({
      level: 'info',
      collapsed: true
    })
  );
}
