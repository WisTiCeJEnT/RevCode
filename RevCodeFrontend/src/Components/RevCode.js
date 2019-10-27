import React, { Component } from "react";
import {
  Container,
  Icon,
  Grid,
  Header,
  Menu,
  Segment,
  Dropdown,
  List
} from "semantic-ui-react";
import firebase from "./../FirebaseAPI";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import File from "./File";


export class RevCode extends Component {
  state = {
    fileId:"",
    code: `a = int(input())\nb = []\nfor i in range(a):\n\tb.append(i)`,
    userData: { name: "" },
    userFile:[]
  };
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const url = "https://revcode.herokuapp.com/userdata?uid=" + uid;
    axios
      .get(url)
      .then(async res => {
        //console.log(res.data.userData);
        this.setState({ userData: res.data.userData.user_data });
        this.setState({ userFile: res.data.userData.user_storage });
      })
      .catch(err => {
        alert(err.message);
      });
  }

  setCurrentFile=(fileId)=>{
    this.setState({fileId:fileId})
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{ padding: "0.5em 0em" }}
          vertical
        >
          <Menu inverted secondary size="large">
            <Menu.Item as="a" header style={{ marginLeft: "2em" }}>
              <Icon name="code" />
              <b>RevCode</b>
            </Menu.Item>

            <Menu.Menu position="right">
              <Dropdown item simple icon="user circle">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text={
                      <span>
                        Signed in as <strong>{this.state.userData.name}</strong>
                      </span>
                    }
                    disabled
                  />
                  <Dropdown.Item
                    text="Sign Out"
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        </Segment>

        <Segment vertical style={{ height: "100vh", padding: "1em 0em" }}>
          <Container >
            <Grid divided stackable>
              <Grid.Column width={3}>
                <Header as="h4" content="Files" />
                
                  <List divided relaxed>
                     <File data={this.state.userFile} setCurrentFile={this.setCurrentFile} /> 
                  </List>
              
              </Grid.Column>
              <Grid.Column width={6}>
                <Header as="h4" content="Speech" />
              </Grid.Column>

              <Grid.Column width={7}>
                <Header as="h4" content="Code Display" />
                <SyntaxHighlighter
                  language="python"
                  style={atomDark}
                  wrapLines={true}
                >
                  {this.state.code}
                </SyntaxHighlighter>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default RevCode;
