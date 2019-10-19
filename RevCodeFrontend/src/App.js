import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { Container, Header, Menu, Icon } from "semantic-ui-react";
//import Speech from "./Components/Speech";
import Login from "./Components/Login";
import Register from "./Components/Register";
import RevCode from "./Components/RevCode";
import HomepageLayout from "./Components/HomepageLayout";
//import withAuthProtection from "./withAuthProtection";
import firebase from "./FirebaseAPI";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={RevCode} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
