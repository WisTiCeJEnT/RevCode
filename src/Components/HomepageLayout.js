import PropTypes from "prop-types";
import React, { Component, useContext  } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { AuthContext } from "./../Auth";
import { Redirect } from "react-router";



const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="RevCode"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h3"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    >
      <Header.Content>
        <b>{"<>"}</b> Speak your code <b>{"</>"}</b>
      </Header.Content>
    </Header>

    <Button
      primary
      size="huge"
      style={{
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    >
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a">###</Menu.Item>
                <Menu.Item as="a">###</Menu.Item>
                <Menu.Item as="a">###</Menu.Item>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button inverted={!fixed}>Log In</Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">####</Menu.Item>
          <Menu.Item as="a">####</Menu.Item>
          <Menu.Item as="a">####</Menu.Item>
          <Menu.Item as="a">####</Menu.Item>
          <Menu.Item as="a">####</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/main" />;
  }

  return (
    <ResponsiveContainer>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          ###Content###
        </Grid>
      </Segment>

      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="#####" />
                <List link inverted>
                  <List.Item as="a">######</List.Item>
                  <List.Item as="a">######</List.Item>
                  <List.Item as="a">######</List.Item>
                  <List.Item as="a">######</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="#####" />
                <List link inverted>
                  <List.Item as="a">######</List.Item>
                  <List.Item as="a">######</List.Item>
                  <List.Item as="a">######</List.Item>
                  <List.Item as="a">######</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  ######
                </Header>
                <p>########################</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  );
};
export default HomepageLayout;
