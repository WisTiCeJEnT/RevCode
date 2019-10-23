import React, { Component } from "react";
import {
  Container,
  Divider,
  Icon,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Label
} from "semantic-ui-react";
import firebase from "./../FirebaseAPI";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class RevCode extends Component {
  componentDidMount() {
    console.log(firebase.auth().currentUser.uid);
  }
  state = {
    code: `a = int(input())\nb = []\nfor i in range(a):\n\tb.append(i)`
  };

  render() {
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

            <Menu.Item
              as="a"
              header
              position="right"
              style={{ marginRight: "2em" }}
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Name
            </Menu.Item>
          </Menu>
        </Segment>

        <Segment vertical style={{ height: "100vh", padding: "1em 0em" }}>
          <Container >
            <Grid divided stackable>
              <Grid.Column width={3}>
                <Header as="h4" content="Files" />
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
