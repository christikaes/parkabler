require('normalize.css/normalize.css');

// Needed for Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import {Paper} from 'material-ui';

import Map from '~/components/Map/Map.js';
import Splash from '~/components/Splash/Splash.js';

import styles from './Main.scss';

class AppComponent extends React.Component {
  render() {
    return (
      <Paper className={styles.app}>
        <Splash />
        <Map />
      </Paper>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
