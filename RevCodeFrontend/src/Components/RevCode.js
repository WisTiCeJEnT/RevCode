import React, { Component } from "react";
import {
  Container,
  Icon,
  Grid,
  Header,
  Menu,
  Segment,
  Dropdown,
  List,
  Button,
  Modal
} from "semantic-ui-react";
import firebase from "./../FirebaseAPI";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import File from "./File";

export class RevCode extends Component {
  state = {
    fileId: "",
    fileName:"",
    extension: "",
    code: "",
    userData: { name: "", uid: "" },
    userFile: [],
    modalOpen: false
  };
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const url = "https://revcode.herokuapp.com/userdata?uid=" + uid;
    axios
      .get(url)
      .then(async res => {
        this.setState({ userData: res.data.userData.user_data });

        //add active to each object in array
        const tmp = [...res.data.userData.user_storage];
        tmp.map(key => {
          return (key.active = false);
        });

        this.setState({ userFile: tmp });
      })
      .catch(err => {
        alert(err.message);
      });
  }

  setCurrentFile = (fileId, fileExt , fileName) => {
    const ex = fileExt.split(" ")[2].toLowerCase();
    this.setState({ fileId: fileId });
    this.setState({ extension: ex });
    this.setState({ fileName: fileName });

    //set active file
    const tmp = [...this.state.userFile];
    tmp.map(key => {
      if (key.file_id === fileId) return (key.active = true);
      else return (key.active = false);
    });
    this.setState({ userFile: tmp });
    firebase
      .database()
      .ref(
        "user/" + this.state.userData.uid + "/user_storage/" + fileId + "/code"
      )
      .once("value", data => {
        this.setState({ code: data.val() });
      });
  };

  delFile = () => {
    const tmp = [
      ...this.state.userFile.filter(file => file.file_id !== this.state.fileId)
    ];
    this.setState({modalOpen:false})
    this.setState({ userFile: tmp });
    this.setState({ fileId: "", extension: "", code: "" ,fileName:""});
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{ padding: "0.5em 0em" }}
          vertical
        >
          <Menu inverted secondary size="large">
            <Menu.Item as="a" header style={{ marginLeft: "2em" }}>
              <Icon name="code" />
              <b>RevCode</b>
            </Menu.Item>

            <Menu.Menu position="right">
              <Dropdown item simple icon="user circle">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text={
                      <span>
                        Signed in as <strong>{this.state.userData.name}</strong>
                      </span>
                    }
                    disabled
                  />
                  <Dropdown.Item
                    text="Sign out"
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        </Segment>

        <Segment vertical style={{ padding: "1em 0em" }}>
          <Container>
            <Grid divided stackable style={{ minHeight: "90vh" }}>
              <Grid.Column width={3}>
                <Grid.Row style={{ height: "98%" }}>
                  <Header as="h4" content="Files" />

                  <List divided relaxed animated selection>
                    <File
                      data={this.state.userFile}
                      setCurrentFile={this.setCurrentFile}
                    />
                  </List>
                </Grid.Row>
                <Grid.Row style={{ height: "2%" }}>
                  <Button.Group compact size="mini" floated="right" basic>
                    <Button icon>
                      <Icon name="add" />
                    </Button>

                    <Modal
                      trigger={
                        <Button icon onClick={()=>{
                          if(this.state.fileId!=="")
                            this.setState({modalOpen:true})
                          else
                            alert("Choose your file to delete")}}>
                          <Icon name="minus" />
                        </Button>
                      }
                      basic
                      size="small"
                      open={this.state.modalOpen}
                    >
                      <Header>
                        <Icon name="trash alternate" color="red" />
                        <Header.Content>
                          Do you want to delete  <i>{this.state.fileName}?</i>
                        </Header.Content>
                      </Header>
                      <Modal.Content>
                        <p>
                          Your file will permanently be deleted. {" "}
                          <b>Are you sure you want to delete it?</b>
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button basic color="red" inverted onClick={()=>{this.setState({modalOpen:false})}}>
                          <Icon name="remove" /> No
                        </Button>
                        <Button color="green" inverted onClick={this.delFile}>
                          <Icon name="checkmark" /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Button.Group>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header as="h4" content="Speech" />
              </Grid.Column>

              <Grid.Column width={7}>
                <Header as="h4" content="Code Display" />
                <SyntaxHighlighter
                  language={this.state.extension}
                  style={atomDark}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {this.state.code}
                </SyntaxHighlighter>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default RevCode;
