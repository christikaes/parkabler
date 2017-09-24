const createLogger = require('redux-logger');
const persistState = ('redux-localstorage');

import { IAppState, rootReducer, Spots, Spot } from './store';

export {
  IAppState,
  rootReducer,
  Spots, Spot
};

export let middleware = [];
export let enhancers = [];
  // store state offline
  // persistState('spots', {key: 'parkabler/app/state'});

// Enable logger for dev mode
// TODO: Make this consistent with webpack
// if (process.env.ENV === 'server') {
//   middleware.push(
//     createLogger({
//       level: 'info',
//       collapsed: true
//     })
//   );
// }
