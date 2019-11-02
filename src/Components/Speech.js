import React, { Component } from "react";
import {
  Button,
  Message,
  Container,
  Header,
  Menu,
  Icon
} from "semantic-ui-react";
import axios from "axios";

window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = "";
let recognition = new window.SpeechRecognition();
recognition.lang = "en-US";
recognition.lang = "th-TH";
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
export class Speech extends Component {
  state = { pressed: false, res: "" };
  btnPressed = () => {
    this.setState({ pressed: !this.state.pressed }, () => {
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
              finalTranscript += transcript;
              
            } else {
              interimTranscript += transcript;
            }
          }
          this.setState({ res: finalTranscript + interimTranscript });

          axios
            .post("http://127.0.0.1:5000/speech", {
              res: finalTranscript + interimTranscript
            })
            .then(res => {
              console.log("####", res);
            });
        };
        recognition.start();
      } else {
        recognition.stop();
      }
    });
  };
  render() {
    console.log(this.state.res);

    return (
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
          <Button
            content={!this.state.pressed ? "Start Recording" : "Stop Recording"}
            icon="microphone"
            color={!this.state.pressed ? "teal" : "red"}
            labelPosition="left"
            onClick={this.btnPressed}
          />
          <Message>
            <Message.Header>Result</Message.Header>
            <p>{this.state.res}</p>
          </Message>
        </Container>
      </div>
    );
  }
}

export default Speech;
