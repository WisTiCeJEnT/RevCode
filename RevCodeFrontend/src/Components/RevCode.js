import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Header,
  Icon,
  Menu,
  Segment,
  Container,
  Grid
} from "semantic-ui-react";
import firebase from "../FirebaseAPI";

export class RevCode extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column widescreen>
              <Segment inverted>
                <Menu inverted secondary>
                  <Menu.Item>
                    <Icon name="code" />
                    <b>RevCode</b>
                  </Menu.Item>
                </Menu>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row>
        <Grid.Column width={2} color="red">
        <Container>
       
        File
       
        </Container>
        </Grid.Column>
        <Grid.Column width={7} color="blue">
        Speech Section
        </Grid.Column>
        <Grid.Column width={7} color="black">
        Code Section
        </Grid.Column>
        </Grid.Row> */}
        </Grid>
      </div>
    );
  }
}

export default RevCode;

// <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
