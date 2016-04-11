import React from 'react';
import {List, ListItem, FontIcon} from 'material-ui';

// import styles from './Add.scss'

export default class TextView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces:[
        {
          numSpaces: 2,
          dist: 200,
          key: 0
        },
        {
          numSpaces: 2,
          dist: 200,
          key: 1
        },
        {
          numSpaces: 2,
          dist: 200,
          key: 2
        },
        {
          numSpaces: 2,
          dist: 200,
          key: 3
        },
        {
          numSpaces: 2,
          dist: 200,
          key: 4
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <List>
          {this.state.spaces.map(function(space){
           return (<ListItem
             primaryText={"There are " + space.numSpaces + " spaces " + space.dist + " feet from the desitnation."}
             rightIcon={<FontIcon className="material-icons">directions</FontIcon>}
           />);
          })}
        </List>
      </div>
    );
  }
}
