import React from "react";
import { Container, Header, Menu, Icon } from "semantic-ui-react";
import Speech from "./Speech"

const App = () => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          <Icon size="large" name="microphone" color="red" />
          Speech Recognition
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: "7em" }} textAlign="left">
      <Header as="h1">Speech to Text</Header>
      <Speech />
    </Container>
  </div>
);

export default App;
