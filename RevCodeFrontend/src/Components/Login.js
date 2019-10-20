import React, { useCallback, useContext } from "react";
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
import firebase from "../FirebaseAPI";
import { AuthContext } from "./../Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/main");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/main" />;
  }
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
            onSubmit={handleLogin}
          >
    
            <Form.Input
              icon="user"
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
              type="password"
              placeholder="Password"
              name="password"
              type="password"
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

export default withRouter(Login);

/*export class Login extends Component {
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

    
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }
    const email = this.state.username;
    const password = this.state.password;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log("#", response.user.uid);
          alert("Successfully Logged In");
          return this.props.history.push("/main")
          
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

export default Login;*/
