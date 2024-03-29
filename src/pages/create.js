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

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      email: "",
      password: "",
      cPassword: "",
      first: "",
      last: "",
    };
  }

  async componentDidMount() {
    // const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //   // This function will be called whenever the authentication state changes
    //   this.props.didCreate(user);
    // });

    // // Clean up the subscription when the component unmounts
    // return () => unsubscribe();
  }

  onEChange(e) {
    this.setState({ email: e.target.value });
  }

  onPChange(e) {
    this.setState({ password: e.target.value });
  }

  onCPChange(e) {
    this.setState({ cPassword: e.target.value });
  }

  onFChange(e) {
    this.setState({ first: e.target.value });
  }

  onLChange(e) {
    this.setState({ last: e.target.value });
  }

  CreateForm() {
    return (
      <>
        <div className="created-text">
            <h1>Game Created!</h1>
            <h1>Action Code:</h1>
            <span className="action-code">{this.props.actionCode}</span>
            <h3>Players: 2</h3>
        </div>
        <div className="join-btns">
        <Button
            type="submit"
            className="join-btn"
            onClick={() => {
            this.props.startGame()
            }}
        >
            Start Game
        </Button>
        <span style={{ color: "white", marginTop: "30px", marginBottom: "10px", fontSize: "18px" }}>
            Or
        </span>
        <Button
            className="join-btn"
            onClick={() => this.props.goToJoin()}
            onTouchStart={() => this.props.goToJoin()}
            style={{ marginBottom: "15px" }}
        >
            Join Game
        </Button>
        </div>
      </>
    );
  }


  renderForm() {
      return this.CreateForm();
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


export default Create;
