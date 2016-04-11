require('normalize.css/normalize.css');

// Needed for Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import {Paper} from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ParkableTheme from '~/styles/ParkableTheme';

import AppBar from '~/components/AppBar/AppBar.js';
import Map from '~/components/Map/Map.js';
import Splash from '~/components/Splash/Splash.js';
import Add from '~/components/Add/Add.js';
import TextView from '~/components/TextView/TextView.js';

import styles from './Main.scss';

class AppComponent extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(ParkableTheme)
    };
  }

  render() {
    return (
      <Paper className={styles.app}>
        <AppBar />
        <Splash />
        <Map />
        <Add />
        <TextView />
      </Paper>
    );
  }
}

AppComponent.defaultProps = {
};

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
}

export default AppComponent;
