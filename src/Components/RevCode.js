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
  Input,
  Dimmer,
  Loader,
  Message
} from "semantic-ui-react";
import firebase from "./../FirebaseAPI";
import axios from "axios";
import File from "./File";
import Code from "./Code";
import recognition from "./Recognition";
import Language from "./Language";
import "./../Style/Mic.css";

export class RevCode extends Component {
  state = {
    fileId: "",
    fileName: "",
    extension: "",
    code: "",
    indent: [],
    userData: { name: "", uid: "" },
    userFile: [],
    modalOpen: false,
    modalAddOpen: false,
    dropVal: "Python",
    inputVal: "",
    pressed: false,
    text: "",
    codeLoader: true,
    addLoader: false,
    delLoader: false,
    fileLoader: false,
    saveLoader: false,
    warning: true,
    ErrPos: "",
    howtoFile: "",
    interTrim: "",
    finalTran: false
  };
  finalTranscript = "";

  initializeData = async callback => {
    this.setState({ fileLoader: true, fileId: "Default" });
    const uid = firebase.auth().currentUser.uid;
    //console.log('#',uid)
    const url = "https://revcode.herokuapp.com/userdata?uid=" + uid;
    const res = await axios
      .get(url)
      .then(res => res)
      .catch(({ message }) => ({ is_error: true, message }));
    //console.log('#',res)
    if (res.is_error) return alert(res.message);
    //add active to each object in array
    //console.log('#',res)
    try {
      const tmp = [...res.data.userData.user_storage];
      tmp.forEach(key => {
        key.active = false;
        if (key.filename === "HowTo.txt") {
          this.setState({ howtoFile: key.file_id });
        }
      });

      this.setState(
        {
          userData: res.data.userData.user_data,
          userFile: tmp,
          fileLoader: false,
          fileId: ""
        },
        callback
      );
    } catch {
      this.setState(
        {
          userData: "Default",
          userFile: [],
          fileLoader: false,
          fileId: ""
        },
        callback
      );
    }
  };

  componentDidMount() {
    this.initializeData();
  }

  setCurrentFile = (fileId, fileExt, fileName) => {
    let ex = "python";
    if (fileExt === "txt - Text file") ex = "file text";

    this.setState({
      fileId: fileId,
      extension: ex,
      fileName: fileName,
      codeLoader: true
    });

    //set active file
    const tmp = [...this.state.userFile];
    tmp.map(key => {
      if (key.file_id === fileId) return (key.active = true);
      else return (key.active = false);
    });

    this.setState({ userFile: tmp });

    const url =
      "https://revcode.herokuapp.com/loadfile?file_id=" +
      fileId +
      "&uid=" +
      this.state.userData.uid;
    axios
      .get(url)
      .then(res => {
        const code = res.data.file_data.code;
        //console.log(res)
        const indent = res.data.file_data.indent;
        this.setState({ indent: indent, codeLoader: false });
        let result = "";
        code.map((c, index) => {
          if (index !== code.length - 1) {
            return (result += "\t".repeat(indent[index]) + c + "\n");
          } else {
            return (result += "\t".repeat(indent[index]) + c);
          }
        });
        this.setState({ code: result });
      })
      .catch(error => {
        this.setState({ code: "" });
        console.log(error.message);
      });

    /*firebase
      .database()
      .ref(
        "user/" + this.state.userData.uid + "/user_storage/" + fileId + "/code"
      )
      .once("value", data => {
        console.log(data)
        //this.setState({ code: data.val() });
      });*/
  };

  delFile = () => {
    this.setState({ delLoader: true });
    const data = { uid: this.state.userData.uid, file_id: this.state.fileId };
    axios
      .post("https://revcode.herokuapp.com/removefile", data)
      .then(() => {
        const tmp = [
          ...this.state.userFile.filter(
            file => file.file_id !== this.state.fileId
          )
        ];
        this.setState({
          modalOpen: false,
          userFile: tmp,
          fileId: "",
          extension: "",
          code: "",
          fileName: "",
          delLoader: false
        });
      })
      .catch(e => {
        alert(e.message);
      });
  };

  addFile = async () => {
    this.setState({ addLoader: true });
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
      const tmp = [...this.state.userFile];
      tmp.map(key => {
        if (key.file_id === fileId) {
          this.setState({
            extension: "python",
            fileName: key.filename,
            addLoader: false,
            codeLoader: false
          });
          return (key.active = true);
        } else return (key.active = false);
      });

      //console.log("#", tmp);
      this.setState({
        fileId: res.data.file_id,
        modalAddOpen: false,
        userFile: tmp,
        code: ""
      });
    });
  };

  codeEdit = code => {
    this.setState({ code: code });
  };

  saveFile = () => {
    const code = this.state.code.split("\n");
    let res = [];
    let indent = [];
    this.setState({ saveLoader: true });
    code.forEach(c => {
      res.push(c);
      let count = 0;
      for (let i = 0; i < c.length; i++) {
        if (c[i] !== "\t") {
          indent.push(count);
          break;
        } else count += 1;
      }
    });

    const url = "https://revcode.herokuapp.com/savefile";
    const data = {
      uid: this.state.userData.uid,
      file_id: this.state.fileId,
      code: res,
      filename: this.state.fileName,
      extension:
        this.state.extension === "python" ? "py - Python" : "txt - Text file",
      indent: indent
    };

    //console.log(data);
    axios
      .post(url, data)
      .then(
        this.setState(
          { warning: false, ErrPos: "Pos", saveLoader: false },
          () => {
            setTimeout(() => {
              this.setState({ warning: true, ErrPos: "" });
            }, 2000);
          }
        )
      )
      .catch(error => {
        alert(error.message);
      });
  };

  Record = () => {
    try {
      this.setState(
        { pressed: !this.state.pressed, interTrim: "", finalTran: "" },
        () => {
          if (
            this.state.pressed &&
            window.hasOwnProperty("webkitSpeechRecognition")
          ) {
            recognition.onresult = event => {
              let interimTranscript = "";
              for (
                let i = event.resultIndex, len = event.results.length;
                i < len;
                i++
              ) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                  this.setState({ fileLoader: true });
                  this.finalTranscript += transcript;
                  this.setState({
                    interTrim: this.finalTranscript,
                    finalTran: true
                  });
                  const data = {
                    uid: this.state.userData.uid,
                    file_id: this.state.fileId,
                    indent: 0,
                    line_no: 0,
                    raw_text: this.finalTranscript
                  };

                  axios
                    .post("https://revcode.herokuapp.com/speech", data)
                    .then(res => {
                      console.log(res);
                      this.finalTranscript = "";
                      let tmp = this.state.code;
                      if (tmp !== "" && res.data.code !== "" && res.data.code) tmp += "\n";
                      tmp += res.data.code;
                      this.setState({
                        code: tmp,
                        fileLoader: false
                      });
                    })
                    .catch(error => {
                      alert(error.message);
                    });
                } else {
                  interimTranscript += transcript;
                  this.setState({
                    interTrim: interimTranscript,
                    finalTran: false
                  });
                  //console.log("#", interimTranscript);
                }
              }

              // this.setState({ text:this.finalTranscript+interimTranscript},()=>{
              //   this.setState({code:this.state.code.concat("\n"+"#"+this.state.text)})
              // });
            };
            recognition.start();
          } else {
            recognition.stop();
            console.log("error");
          }
        }
      );
    } catch {
      console.log("error");
      this.setState({ pressed: !this.state.pressed });
    }
  };

  messageCheck = () => {
    if (this.state.ErrPos === "Err") return "Choose your file!";
    else if (this.state.ErrPos === "Pos") return "Successfully saved";
    else if (this.state.ErrPos === "Init") return "Cannot delete this file!";
  };

  render() {
    //console.log(this.state);
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
                <Grid.Row style={{ height: "88%" }}>
                  <Header as="h4">
                    {!this.state.fileLoader ? (
                      <Icon name="folder" link />
                    ) : (
                      <Loader
                        active
                        inline
                        size="mini"
                        style={{ marginRight: "0.5em", marginTop: "-0.3em" }}
                      />
                    )}
                    <Header.Content>Files</Header.Content>
                  </Header>

                  <List divided relaxed animated selection>
                    <File
                      data={this.state.userFile}
                      setCurrentFile={this.setCurrentFile}
                    />
                  </List>
                  <Container textAlign="center" style={{ marginTop: "4em" }}>
                    <Button
                      circular
                      icon
                      color="red"
                      onClick={() => {
                        if (this.state.fileId !== "") this.Record();
                        else {
                          this.setState(
                            { warning: false, ErrPos: "Err" },
                            () => {
                              setTimeout(() => {
                                this.setState({
                                  warning: true,
                                  ErrPos: ""
                                });
                              }, 2000);
                            }
                          );
                        }
                      }}
                      inverted={!this.state.pressed}
                      className={this.state.pressed ? "Rec" : null}
                    >
                      <Icon
                        name={!this.state.pressed ? "microphone" : "circle"}
                        size="big"
                      />
                    </Button>
                  </Container>
                  <Container style={{ marginTop: "2em" }}>
                    <Message
                      color={this.state.finalTran ? "green" : "blue"}
                      hidden={!this.state.pressed}
                    >
                      <Message.Header>
                        Speech{" "}
                        {!this.state.finalTran ? (
                          <span>
                            <Icon name="spinner" loading />
                          </span>
                        ) : (
                          <span>
                            <Icon name="check circle" color="green" />
                          </span>
                        )}
                      </Message.Header>
                      <p>{this.state.interTrim}</p>
                    </Message>
                  </Container>
                </Grid.Row>
                <Grid.Row style={{ height: "6%" }}>
                  <Message
                    positive={this.state.ErrPos === "Pos" ? true : false}
                    hidden={this.state.warning}
                    error={
                      this.state.ErrPos === "Err" ||
                      this.state.ErrPos === "Init"
                        ? true
                        : false
                    }
                    style={{ padding: "0.3em 0.1em", textAlign: "center" }}
                  >
                    {this.messageCheck()}
                  </Message>
                </Grid.Row>
                <Grid.Row style={{ height: "6%" }}>
                  <Button.Group compact size="mini" floated="left" inverted>
                    <Button
                      color="teal"
                      loading={this.state.saveLoader}
                      content="Save"
                      onClick={() => {
                        if (this.state.fileId !== "") this.saveFile();
                        else {
                          this.setState(
                            { warning: false, ErrPos: "Err" },
                            () => {
                              setTimeout(() => {
                                this.setState({
                                  warning: true,
                                  ErrPos: ""
                                });
                              }, 2000);
                            }
                          );
                        }
                      }}
                    />
                  </Button.Group>
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
                        <Button
                          color="green"
                          onClick={this.addFile}
                          loading={this.state.addLoader}
                        >
                          <Icon name="checkmark" /> Add
                        </Button>
                      </Modal.Actions>
                    </Modal>
                    <Modal
                      trigger={
                        <Button
                          icon
                          onClick={() => {
                            if (
                              this.state.fileId !== "" &&
                              this.state.fileId !== this.state.howtoFile
                            )
                              this.setState({ modalOpen: true });
                            else if (
                              this.state.fileId === this.state.howtoFile
                            ) {
                              this.setState(
                                { warning: false, ErrPos: "Init" },
                                () => {
                                  setTimeout(() => {
                                    this.setState({
                                      warning: true,
                                      ErrPos: ""
                                    });
                                  }, 2000);
                                }
                              );
                            } else
                              this.setState(
                                { warning: false, ErrPos: "Err" },
                                () => {
                                  setTimeout(() => {
                                    this.setState({
                                      warning: true,
                                      ErrPos: ""
                                    });
                                  }, 2000);
                                }
                              );
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
                        <Button
                          color="green"
                          inverted
                          onClick={this.delFile}
                          loading={this.state.delLoader}
                        >
                          <Icon name="checkmark" /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Button.Group>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column width={13}>
                <Dimmer.Dimmable
                  as="div"
                  blurring
                  style={{ height: "90vh", width: "100%" }}
                  dimmed={this.state.codeLoader}
                >
                  <Dimmer active={this.state.codeLoader}>
                    {this.state.fileId ? (
                      <Loader size="massive" />
                    ) : (
                      <Header as="h2" icon inverted>
                        <Icon name="file" style={{ padding: "0.5em" }} />
                        Choose file or Add new file
                      </Header>
                    )}
                  </Dimmer>
                  <Code CodeEdit={this.codeEdit} value={this.state.code} />
                </Dimmer.Dimmable>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default RevCode;
