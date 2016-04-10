require('normalize.css/normalize.css');

import React from 'react';
import styles from './Main.scss';

// let yeomanImage = require('../images/yeoman.png');
import logo from '~/images/yeoman.png';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className={styles.test}>TEST</div>
        <img src={logo} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
