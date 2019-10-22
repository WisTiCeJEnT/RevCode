import React, { useCallback, useState, useContext } from "react";
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
  GridRow,
  Progress
} from "semantic-ui-react";
import "./../Style/Login.css";
import axios from "axios";
import firebase from "../FirebaseAPI";
import { AuthContext } from "./../Auth";
const zxcvbn = require("zxcvbn");

const Register = ({ history }) => {
  const [Display, setDisplay] = useState({ show: false });
  const [Err, setErr] = useState({ error: "" });
  const [progress, setProgress] = useState({
    percent: 0,
    color: "grey",
    scale: ""
  });
  const handleRegister = useCallback(
    async event => {
      event.preventDefault();

      const { email, password, cpassword, username } = event.target.elements;
      if (!username.value) {
        return setErr({ error: "Username is required" });
      }
      if (!email.value) {
        return setErr({ error: "Email is required" });
      }

      if (!password.value) {
        return setErr({ error: "Password is required" });
      }
      if (!cpassword.value) {
        return setErr({ error: "Confirm password is required" });
      }
      if (password.value !== cpassword.value) {
        return setErr({
          error: "Your password and confirm password don't match"
        });
      }
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

                history.push("/");
              })
              .catch(err => {
                setErr({ error: err.message });
                //alert(err)
              });
            firebase.auth().signOut();
          })
          .catch(err => {
            setErr({ error: err.message });
            //alert(error)
          });
      } catch (err) {
        setErr({ error: err.message });
        //alert(error)
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
          <Header.Content style={{ color: "white" }}>Sign Up</Header.Content>
        </Header>
        <Divider />
        <Form
          inverted
          style={{ paddingTop: 20 }}
          error
          onSubmit={handleRegister}
        >
          {Err.error && <Message error header={Err.error} />}
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
            onChange={e => {
              setDisplay({ show: true });
              const testedResult = zxcvbn(e.target.value);
              const score = (testedResult.score + 1) * 20;

              if (score === 20) {
                setProgress({ percent: score, color: "red", scale: "Weak" });
              }
              if (score === 40) {
                setProgress({ percent: score, color: "yellow", scale: "Fair" });
              }
              if (score === 60) {
                setProgress({ percent: score, color: "blue", scale: "Normal" });
              }
              if (score === 80) {
                setProgress({ percent: score, color: "teal", scale: "Good" });
              }
              if (score === 100) {
                setProgress({
                  percent: score,
                  color: "green",
                  scale: "Strong"
                });
              }
              console.log(progress);
            }}
          />

          {!Display.show ? null : (
            <Progress
              percent={progress.percent}
              color={progress.color}
              size="tiny"
              style={{ marginBottom: "1em" }}
            />
          )}

          {!Display.show ? null : (
            <Header
              as="h5"
              textAlign="left"
              color={progress.color}
              style={{ marginTop: "1em" }}
            >
              <Header.Content>
                <b>Password Strength </b> : <i>{progress.scale}</i>
              </Header.Content>
            </Header>
          )}

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
              <Grid.Row>
                <Button
                  type="submit"
                  content="Sign Up"
                  basic
                  inverted
                  color="teal"
                  size="large"
                  style={{ marginTop: "1em" }}
                />
              </Grid.Row>
              <GridRow>
                <Header as="h5" textAlign="center">
                  <Header.Content
                    style={{ color: "#909090", marginTop: "2em" }}
                  >
                    Already have an account?{" "}
                    <Link to="/login">
                      <i>Sign In</i>
                    </Link>
                  </Header.Content>
                </Header>
              </GridRow>
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
