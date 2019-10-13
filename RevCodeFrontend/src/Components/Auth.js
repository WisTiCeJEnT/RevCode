import React, { Component } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
  Divider
} from "semantic-ui-react";
import "./../Style/Login.css";
import firebase from "firebase/app";
require("firebase/auth");

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
      storageBucket: "projectId.appspot.com"
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
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        // this.setState({
        //   currentUser: response.user
        // });
        console.log("#", response.user.uid);
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
      <div className="area">
        <Container className="box" style={{ width: 400 }}>
          <Header as="h2" icon textAlign="center">
            <Header.Content style={{ color: "white" }}>Sign In</Header.Content>
          </Header>
          <Divider />
          <Form
            inverted
            style={{ paddingTop: 20 }}
            error
            onSubmit={this.handleSubmit}
          >
            {this.state.error && (
              <Message
                onClick={this.dismissError}
                error
                header={this.state.error}
              />
            )}
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUserChange}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
            <Grid>
              <Grid.Column textAlign="center">
                <Button
                  type="submit"
                  content="Login"
                  basic
                  inverted
                  color="teal"
                  size="large"
                  style={{ marginTop: "1em" }}
                />
              </Grid.Column>
            </Grid>
          </Form>
        </Container>

        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default Auth;
