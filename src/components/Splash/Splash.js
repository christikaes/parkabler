import React from 'react';
// import styles from './splash.scss';

import logo from '~/assets/logo.png';

class Splash extends React.Component {
  render() {
    return (
      <div>
        <img src={logo} alt="Parkable" />
      </div>
    );
  }
}

export default Splash;
