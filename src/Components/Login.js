import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Container,
  Divider,
  Icon,
  Dimmer,
  Loader
} from "semantic-ui-react";
import "./../Style/Login.css";
import firebase from "../FirebaseAPI";
import { AuthContext } from "./../Auth";

const Login = ({ history }) => {
  const [Err, setErr] = useState({ error: "" });
  const [Load, setLoad] = useState({ loading: false });
  const [Firebaseload, setFirebaseload] = useState({ loading: true });

  useEffect(() => {
    let isSubscribed = true;
    firebase.auth().onAuthStateChanged(() => {
      if (isSubscribed) {
        setFirebaseload({ loading: false });
      }
    });
    return () => (isSubscribed = false);
  }, []);
  
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      setLoad({ loading: true });
      const { email, password } = event.target.elements;
      if (!email.value) {
        setLoad({ loading: false });
        return setErr({ error: "Email is required" });
      }
      if (!password.value) {
        setLoad({ loading: false });
        return setErr({ error: "Password is required" });
      }
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(() => {
            setLoad({ loading: false });
            history.push("/main");
          });
      } catch (err) {
        setLoad({ loading: false });
        setErr({ error: err.message });
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/main" />;
  }

  if (Firebaseload.loading) {
    return (
      <Dimmer active>
        <Loader size="massive" />
      </Dimmer>
    );
  }

  return (
    <div className="area">
      <Container className="box" style={{ width: 400 }}>
        <Header as="h2" icon textAlign="center">
          <Header.Content style={{ color: "white" }}>Sign In</Header.Content>
        </Header>
        <Divider />
        <Form inverted style={{ paddingTop: 20 }} error onSubmit={handleLogin}>
          {Err.error && <Message error header={Err.error} />}

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
          />
          <Grid>
            <Grid.Column textAlign="center">
              <Grid.Row>
                <Button
                  type="submit"
                  content="Login"
                  basic
                  inverted
                  color="teal"
                  size="large"
                  style={{ marginTop: "1em" }}
                  loading={Load.loading}
                />
              </Grid.Row>
              <Grid.Row>
                <Header as="h5" textAlign="center">
                  <Header.Content
                    style={{ color: "#909090", marginTop: "2em" }}
                  >
                    Don't have an account?{" "}
                    <Link to="/register">
                      <i>Sign Up</i>
                    </Link>
                  </Header.Content>
                </Header>
                <Header as="h6" textAlign="center">
                  <Header.Content style={{ color: "#909090" }}>
                    <Link to="/">
                      <Icon name="arrow left" />
                      <span>Back to RevCode</span>
                    </Link>
                  </Header.Content>
                </Header>
              </Grid.Row>
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
