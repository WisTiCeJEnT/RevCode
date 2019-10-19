import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
//import { Container, Header, Menu, Icon } from "semantic-ui-react";
//import Speech from "./Components/Speech";
import Auth from "./Components/Auth";
import Register from "./Components/Register";
//import RevCode from "./Components/RevCode"
import HomepageLayout from "./Components/HomepageLayout";
const App = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={HomepageLayout} />
        <Route path="/login" component={Auth} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  </div>
);

export default App;
