import React from 'react';
import {FontIcon, FlatButton, RaisedButton, Dialog, TextField, RadioButton, RadioButtonGroup, Slider} from 'material-ui';

// import styles from './Add.scss'

export default class DialogExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    return (
      <div>
        <RaisedButton
          label="Add Spot"
          onTouchTap={this.handleOpen.bind(this)}
          primary={true}
          icon={<FontIcon className="material-icons">add_location</FontIcon>}
        />
        <Dialog
          title="Add Spot"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          // contentStyle={{
          //   width: '100%',
          //   position: 'relative',
          //   bottom: 0,
          //   maxWidth: 'none'
          // }}
        >
        <TextField
           floatingLabelText="Description"
           type="text"
           fullWidth={true}
           multiLine={true}
         />
         <br/>
         How many spots are there?
         <Slider step={0.10} value={.5} label="Number of Spots"/>
         <br/>
         Type of Spot
         <RadioButtonGroup name="type" defaultSelected="dont_know" style={{
           display: 'flex',
           justifyContent: 'space-around'
         }}>
            <RadioButton
              value="residential"
              label="Residential"
              style={{
                width: 'auto'
              }}
            />
            <RadioButton
              value="commercial"
              label="Commercial"
              style={{
                width: 'auto'
              }}
            />
            <RadioButton
              value="dont_know"
              label="I don't know"
              style={{
                width: 'auto'
              }}
            />
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}
