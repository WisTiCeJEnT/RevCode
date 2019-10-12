import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import firebase from "firebase/app";
//import { auth } from 'firebase/app';

//const API_KEY = process.env.REACT_APP_API_KEY;
//console.log(API_KEY);
export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loginData: {}
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);

    var config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: "authfirebase-17e0d.firebaseapp.com",
      databaseURL: "https://authfirebase-17e0d.firebaseio.com",
      projectId: "authfirebase-17e0d",
      storageBucket: "authfirebase-17e0d.appspot.com",
      messagingSenderId: "57933939977",
      appId: "1:57933939977:web:e70901c703d64571"
    };

    firebase.initializeApp(config);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    axios
      .post("https://ku-eiqs-backend.herokuapp.com/login", this.state)
      .then(res => {
        if (!res.data.authentication) {
          return this.setState({ error: "Username or password is incorrect" });
        }
        this.setState({ loginData: res.data });
        this.props.loginAdd(this.state.loginData);
        //console.log(res);
        //console.log(this.state);
      });
    //console.log(this.state);

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
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Auth;
