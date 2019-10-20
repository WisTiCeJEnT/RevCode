import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react";
import firebase from "../FirebaseAPI";
const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin"
  >
    <Menu.Item as="a">
      <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="gamepad" />
      Games
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="camera" />
      Channels
    </Menu.Item>
  </Sidebar>
);

VerticalSidebar.propTypes = {
  visible: PropTypes.bool
};

export class RevCode extends Component {
  state = {
    dimmed: false,
    visible: false,
    activeItem: "home"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { dimmed, visible, activeItem } = this.state;
    console.log(this.state);
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <VerticalSidebar
            animation="push"
            direction="left"
            visible={visible}
          />

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment inverted>
              <Menu inverted pointing secondary>
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={(e, { name }) => {
                    this.setState({ visible: !this.state.visible });
                    this.setState({ activeItem: name });
                  }}
                />
                <Menu.Item
                  name="messages"
                  active={activeItem === "messages"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="friends"
                  active={activeItem === "friends"}
                  onClick={this.handleItemClick}
                />
              </Menu>
            </Segment>
            <Segment basic>
              <Header as="h3">Application Content</Header>
              <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default RevCode;
