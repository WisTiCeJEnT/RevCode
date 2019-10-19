import React, { Component } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Container,
  Divider
} from "semantic-ui-react";
import "./../Style/Login.css";
import axios from "axios";
import firebase from "firebase/app";
require("firebase/auth");

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      error: "",
      currentUser: "",
      loginData: {}
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCPassChange = this.handleCPassChange.bind(this);
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

  handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }

    if (!this.state.email) {
      return this.setState({ error: "Email is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }
    if (!this.state.cpassword) {
      return this.setState({ error: "Confirm Password is required" });
    }
    if (this.state.password !== this.state.cpassword) {
      return this.setState({
        error: "Your password and confirm password don't match"
      });
    }
    const email = this.state.email;
    const password = this.state.password;

    try{
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // this.setState({
        //   currentUser: response.user
        // });
        console.log("#", response);
        axios
          .post("https://revcode.herokuapp.com/adduser", {
            uid: response.user.uid,
            name: this.state.username
          })
          .then(res => {
            console.log(res);
            alert("Successfully Registered");
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
    }
    catch(error)  {
      this.setState({
        error: error.message
      });
    };

    return this.setState({ error: "" });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  handleCPassChange(evt) {
    this.setState({
      cpassword: evt.target.value
    });
  }
  render() {
    console.log(this.state);
    return (
      <div className="area">
        <Container className="box" style={{ width: 400 }}>
          <Header as="h2" icon textAlign="center">
            <Header.Content style={{ color: "white" }}>Register</Header.Content>
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
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              label="Username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUserChange}
            />

            <Form.Input
              icon="mail"
              iconPosition="left"
              label="Email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
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
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={this.state.cpassword}
              onChange={this.handleCPassChange}
            />
            <Grid>
              <Grid.Column textAlign="center">
                <Button
                  type="submit"
                  content="Sign Up"
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

        <ul className="circles">
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

export default Register;
