import React, { Component } from "react";
import { List } from "semantic-ui-react";

export class File extends Component {
  
  
  render() {
    return this.props.data.map(file => (
      <List.Item
        
      >
        <List.Icon
          
        />
        <List.Content>
          <List.Header as="a">{file.filename}</List.Header>
          
        </List.Content>
      </List.Item>
    ));
  }
}

export default File;
