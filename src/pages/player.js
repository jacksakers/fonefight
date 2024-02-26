import React, { Component } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  db,
} from "../firebase";
import { Button } from "react-bootstrap";
import { getDoc, doc } from "firebase/firestore";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      actionCode: "",
      username: ""
    };
  }

  async componentDidMount() {
    // Read query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    var actionCode = params.get("game")

    // If there is a 'page' query parameter, navigate to the corresponding page
    this.setState({
        actionCode: actionCode
    });
  }

  onCChange(e) {
    this.setState({ actionCode: e.target.value });
  }

  onNChange(e) {
    this.setState({ username: e.target.value });
  }

  async onPlayerSubmit(e) {
    e.preventDefault();
  }
  

  renderForm() {
    return <>
        <Button onClick={() => this.props.gameVote(this.state.actionCode, "BVJ")}>Vote</Button>
    </>;
  }

  render() {
    return (
      <>
        <Container style={{ maxWidth: "500px" }}>
          <Card
            style={{
              padding: "10px",
              backgroundColor: "#1C3144",
              marginTop: "35px",
            }}
          >
            {this.renderForm()}
          </Card>
        </Container>
      </>
    );
  }
}


export default Player;
