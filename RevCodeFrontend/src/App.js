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
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={HomepageLayout} />
          <PrivateRoute exact path="/main" component={RevCode} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
