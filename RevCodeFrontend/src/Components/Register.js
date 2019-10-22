import React, { useCallback, useState } from "react";
import { withRouter, Redirect } from "react-router";
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
import firebase from "../FirebaseAPI";
import { AuthContext } from "./../Auth";

const Register = ({ history }) => {
  const [Err, setErr] = useState({ error: "" });
  const handleRegister = useCallback(
    async event => {
      event.preventDefault();

      const { email, password, cpassword, username } = event.target.elements;

      
      if (password.value !== cpassword.value) {
        alert("Confirm password and password don't match");
      } else {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(async response => {
              console.log("#", response);
              await axios
                .post("https://revcode.herokuapp.com/adduser", {
                  uid: response.user.uid,
                  name: username.value
                })
                .then(res => {
                  console.log(res);
                  alert("Successfully Registered");
                })
                .catch(err => {
                  setErr({ error: err.message });
                  //alert(err)
                });
              firebase.auth().signOut();
              history.push("/");
            })
            .catch(err => {
              setErr({ error: err.message });
              //alert(error)
            });
        } catch (err) {
          setErr({ error: err.message });
          //alert(error)
        }
      }
    },
    [history]
  );

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
          onSubmit={handleRegister}
        >
          {Err.error && (
            <Message
              error
              header={Err.error}
            />
          )}
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Username"
            placeholder="Username"
            name="username"
            type="text"
          />
          <Form.Input
            icon="mail"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
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
};
export default withRouter(Register);

/*export class Register extends Component {
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
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit = async evt => {
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

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async response => {
          console.log("#", response);
          await axios
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
    } catch (error) {
      this.setState({
        error: error.message
      });
    }

    return this.setState({ error: "" });
  };

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

export default Register;*/
