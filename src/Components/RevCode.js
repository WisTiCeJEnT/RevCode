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
  Modal,
  Input
} from "semantic-ui-react";
import firebase from "./../FirebaseAPI";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import File from "./File";


const Language = [
  {
    key: "1",
    text: "Python",
    value: "Python",
    icon: "python"
  },
  {
    key: "2",
    text: "Javascript",
    value: "Javascript",
    icon: "js"
  }
];

export class RevCode extends Component {
  state = {
    fileId: "",
    fileName: "",
    extension: "",
    code: "",
    userData: { name: "", uid: "" },
    userFile: [],
    modalOpen: false,
    modalAddOpen: false,
    dropVal: "Python",
    inputVal: ""
  };
  initializeData = async callback => {
    const uid = firebase.auth().currentUser.uid;
    const url = "https://revcode.herokuapp.com/userdata?uid=" + uid;
    const res = await axios
      .get(url)
      .then(res => res)
      .catch(({ message }) => ({ is_error: true, message }));

    if (res.is_error) return alert(res.message);
    //add active to each object in array
    const tmp = [...res.data.userData.user_storage];
    tmp.map(key => (key.active = false));

    this.setState(
      { userData: res.data.userData.user_data, userFile: tmp },
      callback
    );
  };
  componentDidMount() {
    this.initializeData();
  }

  setCurrentFile = (fileId, fileExt, fileName) => {
    const ex = fileExt.split(" ")[2].toLowerCase();
    this.setState({ fileId: fileId, extension: ex, fileName: fileName });

    //set active file
    const tmp = [...this.state.userFile];
    tmp.map(key => {
      if (key.file_id === fileId) return (key.active = true);
      else return (key.active = false);
    });

    this.setState({ userFile: tmp });
    /*firebase
      .database()
      .ref(
        "user/" + this.state.userData.uid + "/user_storage/" + fileId + "/code"
      )
      .once("value", data => {
        this.setState({ code: data.val() });
      });*/
  };

  delFile = () => {
    const tmp = [
      ...this.state.userFile.filter(file => file.file_id !== this.state.fileId)
    ];
    this.setState({
      modalOpen: false,
      userFile: tmp,
      fileId: "",
      extension: "",
      code: "",
      fileName: ""
    });
  };

  addFile = async () => {
    const data = {
      uid: this.state.userData.uid,
      filename:
        this.state.inputVal + (this.state.dropVal === "Python" ? ".py" : ".js"),
      extension:
        this.state.dropVal === "Python" ? "py - Python" : "js - Javascript"
    };
    //console.log('@',data)
    const res = await axios
      .post("https://revcode.herokuapp.com/newfile", data)
      .then(res => res)
      .catch(error => ({ is_error: true, error }));

    if (res.is_error) return alert(res.error);
    //console.log("#", res);
    await this.initializeData(() => {
      const fileId = res.data.file_id;
      const tmp = [
        ...this.state.userFile.map(key => {
          if (key.file_id === fileId) {
            this.setState({ extension: key.extension, fileName: key.filename });
            return (key.active = true);
          } else return (key.active = false);
        })
      ];
      //console.log("#", tmp);
      this.setState({ fileId: res.data.file_id, modalAddOpen: false });
    });
    //this.setState({ userFile: tmp });
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
          <Container fluid>
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
                    <Modal
                      size="mini"
                      trigger={
                        <Button
                          icon
                          onClick={() => {
                            this.setState({ modalAddOpen: true });
                          }}
                        >
                          <Icon name="add" />
                        </Button>
                      }
                      open={this.state.modalAddOpen}
                    >
                      <Modal.Header>
                        <span>
                          Add New File <Icon name="add" />
                        </span>
                      </Modal.Header>
                      <Modal.Content style={{ padding: "1em" }}>
                        <span>
                          Choose file language:{" "}
                          <Dropdown
                            inline
                            options={Language}
                            onChange={(e, { value }) => {
                              this.setState({ dropVal: value });
                            }}
                            value={this.state.dropVal}
                          />
                        </span>
                      </Modal.Content>
                      <Modal.Content style={{ padding: "1em" }}>
                        <span>
                          Enter file name:{" "}
                          <Input
                            label={
                              this.state.dropVal === "Python" ? ".py" : ".js"
                            }
                            labelPosition="right"
                            placeholder="File name..."
                            onChange={e => {
                              this.setState({ inputVal: e.target.value });
                            }}
                          ></Input>
                        </span>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          inverted
                          color="red"
                          onClick={() => {
                            this.setState({ modalAddOpen: false });
                          }}
                        >
                          <Icon name="remove" /> Cancel
                        </Button>
                        <Button color="green" onClick={this.addFile}>
                          <Icon name="checkmark" /> Add
                        </Button>
                      </Modal.Actions>
                    </Modal>
                    <Modal
                      trigger={
                        <Button
                          icon
                          onClick={() => {
                            if (this.state.fileId !== "")
                              this.setState({ modalOpen: true });
                            else alert("Choose your file to delete");
                          }}
                        >
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
                          Do you want to delete <i>{this.state.fileName}?</i>
                        </Header.Content>
                      </Header>
                      <Modal.Content>
                        <p>
                          Your file will permanently be deleted.{" "}
                          <b>Are you sure you want to delete it?</b>
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          basic
                          color="red"
                          inverted
                          onClick={() => {
                            this.setState({ modalOpen: false });
                          }}
                        >
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
