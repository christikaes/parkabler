import React from 'react';
import {AppBar, FontIcon, LeftNav, MenuItem} from 'material-ui';

function handleTouchTap() {
  console.log('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class Bar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    console.log(this.state.open)
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
      <AppBar
        title={<span style={styles.title}>Parkable</span>}
        onTitleTouchTap={handleTouchTap}
        onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
      />
      <LeftNav open={this.state.open}>
        <MenuItem>Text Mode</MenuItem>
        <MenuItem>Map Mode</MenuItem>
        <MenuItem>Add a spot</MenuItem>
        <MenuItem>Report a spot</MenuItem>
      </LeftNav>
      </div>
  )}
}

export default Bar;
