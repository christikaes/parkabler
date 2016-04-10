require('normalize.css/normalize.css');

import React from 'react';
import styles from './Main.scss';

import logo from '~/assets/logo.png';
import Map from '~/components/Map/Map.js';
import Splash from '~/components/Splash/Splash.js';

class AppComponent extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Splash />
        <Map />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
