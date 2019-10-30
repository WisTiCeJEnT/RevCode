import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
const languages = [
  "javascript",
  "python",
 
];

const themes = [
  "monokai",
  "github",
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */


export class Code extends Component {
  

  render() {
    return (
      <AceEditor
        placeholder="Edit your code here"
        mode="python"
        theme="monokai"
        onChange={(code)=>{this.props.CodeEdit(code)}}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        enableSnippets={true}
        enableLiveAutocompletion={true}
        enableBasicAutocompletion={true}
        style={{height:"100%" , width:"100%"}}
        fontSize={18}
        value={this.props.value}
        
      />
    );
  }
}

export default Code;
