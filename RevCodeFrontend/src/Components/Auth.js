import React, { Component } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import firebase from "firebase/app";
require('firebase/auth')



//const API_KEY = process.env.REACT_APP_API_KEY;
//console.log(API_KEY);
export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      currentUser: "",
      loginData: {}
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);

    var config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: "https://revcode-83ac0.firebaseapp.com/",
      databaseURL: "https://revcode-83ac0.firebaseio.com/",
      storageBucket: "projectId.appspot.com",
    };

    firebase.initializeApp(config);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const email = this.state.username;
    const password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(response => {
        // this.setState({
        //   currentUser: response.user
        // });
        console.log('#',response.user.uid)
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });

    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }

    return this.setState({ error: "" });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }
  render() {
    console.log(this.state);
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message>
            <Header as="h3" textAlign="center">
              Log-in to your account
            </Header>
          </Message>
          <Form size="large" error onSubmit={this.handleSubmit}>
            {this.state.error && (
              <Message
                onClick={this.dismissError}
                error
                header={this.state.error}
              />
            )}

            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={this.state.username}
                onChange={this.handleUserChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handlePassChange}
              />

              <Button color="red" fluid size="large" onClick={this.login}>
                Login
              </Button>
            </Segment>
          </Form>
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default Auth;
