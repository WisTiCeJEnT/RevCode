import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { Container, Header, Menu, Icon } from "semantic-ui-react";
//import Speech from "./Components/Speech";
import Auth from "./Components/Auth";
import Register from "./Components/Register";
import RevCode from "./Components/RevCode";
import HomepageLayout from "./Components/HomepageLayout";
import withAuthProtection from "./withAuthProtection";
import firebase from "./FirebaseAPI";
const ProtectedProfile = withAuthProtection("/login")(RevCode);

export class App extends React.Component {
  constructor() {
    super();
    console.log("user", firebase.auth().currentUser);
    this.state = {
      me: firebase.auth().currentUser
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return history.push("/profile");
      });
  };

  render() {
    const { me } = this.state;
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <HomepageLayout />} />
            <Route
              path="/login"
              exact
              render={({ history }) => (
                
                  <Auth history={history} />
                
              )}
            />
            <Route
              path="/main"
              exact
              render={props => (
                
                  <ProtectedProfile {...props} me={me} />
               
              )}
            />
           
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
