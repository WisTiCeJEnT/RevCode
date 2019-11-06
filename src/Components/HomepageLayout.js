import PropTypes from "prop-types";
import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollTo, animateScroll as scroll } from "react-scroll";
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
  Visibility,
  Image,
  Divider
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
    <ScrollTo to="about" smooth={true} offset={-100} duration={500}>
      <Button
        color="teal"
        inverted
        size="huge"
        style={{
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      >
        Get Started
        <Icon name="right arrow" />
      </Button>
    </ScrollTo>
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
              inverted
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              borderless
            >
              <Container>
                <Menu.Item
                  as="a"
                  active={!fixed}
                  onClick={() => {
                    scroll.scrollToTop();
                  }}
                >
                  Home
                </Menu.Item>

                <Menu.Item link>
                  <ScrollTo
                    to="about"
                    smooth={true}
                    offset={-100}
                    duration={500}
                  >
                    About
                  </ScrollTo>
                </Menu.Item>

                <Menu.Item link>
                  <ScrollTo
                    to="feature"
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Feature
                  </ScrollTo>
                </Menu.Item>
                <Menu.Item link>
                  <ScrollTo
                    to="contact"
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Contact
                  </ScrollTo>
                </Menu.Item>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button inverted color="teal">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      inverted
                      color="teal"
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
          <Menu.Item as="a">About</Menu.Item>
          <Menu.Item as="a">Feature</Menu.Item>
          <Menu.Item as="a">Contact</Menu.Item>
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
                  <Link to="/login">
                    <Button inverted>Log In</Button>
                  </Link>
                  <Link to="/register">
                    <Button inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Link>
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
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h2" style={{ fontSize: "2em" }} id="about">
                What's RevCode ?
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <b>RevCode</b> <i>Revolution of Coding </i> is a tool that
                provides you the speech to code feature. No matter where you
                are, you still manage to code with your voice anywhere.
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Why RevCode ?
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Are you bored of ordinary ways of coding ? Imagine you can code
                from anywhere with your own voice, Revcode is what you're
                looking for.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                fluid
                src="https://cdn.dribbble.com/users/99287/screenshots/3839839/work_work_work.gif"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Link to="/register">
                <Button color="teal" size="huge">
                  Try It Now
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "4em 0em" }} vertical id="feature">
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={6}>
              <Image
                fluid
                src="https://cdn.dribbble.com/users/320114/screenshots/2575134/code_dribbble.gif"
              />
            </Grid.Column>
            <Grid.Column floated="right" width={8}>
              <Header as="h2" style={{ fontSize: "2em" }} id="about">
                Speech To Code
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <b>RevCode</b> will preprocess your voice then generate it into
                real codes. Whenever you don't want to code by typing, just turn this feature on and enjoy coding.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h2" style={{ fontSize: "2em" }} id="about">
                File Management
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <b>RevCode</b> provides a file management system which keeps
                your file online and updated.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                size="medium"
                src="https://cdn.dribbble.com/users/183024/screenshots/1945172/folder.gif"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment inverted vertical style={{ padding: "5em 0em" }} id="contact">
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Sitemap</List.Item>
                  <List.Item as="a">Contact Us</List.Item>
                  <List.Item as="a">Religious Ceremonies</List.Item>
                  <List.Item as="a">Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Banana Pre-Order</List.Item>
                  <List.Item as="a">DNA FAQ</List.Item>
                  <List.Item as="a">How To Access</List.Item>
                  <List.Item as="a">Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  );
};
export default HomepageLayout;
