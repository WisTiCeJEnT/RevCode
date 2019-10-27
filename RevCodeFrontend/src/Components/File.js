import React, { Component } from "react";
import { List } from "semantic-ui-react";

export class File extends Component {
  iconCheck(file) {
    if (file === "py - Python") {
      return "python";
    }
    if (file === "js - Javascript") {
      return "js";
    }
  }
  render() {
    return this.props.data.map(file => (
      <List.Item key={file.file_id} onClick={()=>{
          this.props.setCurrentFile(file.file_id,file.extension)
      }}>
        <List.Icon
          name={this.iconCheck(file.extension)}
          size="large"
          verticalAlign="middle"
        />
        <List.Content>
          <List.Header as="a">{file.filename}</List.Header>
          <List.Description as="a">Last edit {file.last_edit}</List.Description>
        </List.Content>
      </List.Item>
    ));
  }
}

export default File;
