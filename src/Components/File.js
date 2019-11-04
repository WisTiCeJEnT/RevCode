import React, { Component } from "react";
import { List } from "semantic-ui-react";

export class File extends Component {
  
  iconCheck(file) {
    if (file === "py - Python" || file === "py - python" || file === "py" || file === "python" || file ==="Python") {
      return "python";
    }
    if (file === "js - Javascript"  ) {
      return "js";
    }
    if (file === "txt - Text file" || file === "txt - text file" || file === "txt"  ) {
      return "file text";
    }
    
  }
  render() {
    return this.props.data.map(file => (
      <List.Item
        key={file.file_id}
        active={file.active}
        onClick={() => {
            this.setState({active:true})
          this.props.setCurrentFile(file.file_id, file.extension , file.filename);
        }}
      >
        <List.Icon
          name={this.iconCheck(file.extension)}
          size="large"
          verticalAlign="middle"
          color={file.active?"green":null}
          loading={this.props.loadIcon}
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
