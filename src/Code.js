import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

export class Code extends Component {
  onChange(newValue) {
    console.log("change", newValue);
  }
  render() {
    return (
      <AceEditor
        mode="python"
        theme="monokai"
        onChange={this.onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        enableSnippets={true}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
      />
    );
  }
}

export default Code;
