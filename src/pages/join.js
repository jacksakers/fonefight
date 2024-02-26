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

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      gameCode: "",
      username: ""
    };
  }

  async componentDidMount() {
    // const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //   // This function will be called whenever the authentication state changes
    //   this.props.didJoin(user);
    // });

    // // Clean up the subscription when the component unmounts
    // return () => unsubscribe();
  }

  onCChange(e) {
    this.setState({ gameCode: e.target.value });
  }

  onNChange(e) {
    this.setState({ username: e.target.value });
  }

  async onJoinSubmit(e) {
    e.preventDefault();
  }
  
  JoinForm() {
    return (
      <>
        <Form onSubmit={(e) => this.onJoinSubmit(e)}>
          <div className="join-form">
            <p>Name:</p>
          </div>
          <Form.Group className="mb-3" >
            <Form.Control
              className="input-box"
              aria-label="Action Code"
              aria-describedby="basic-addon1"
              placeholder="Name"
              onChange={(e) => this.onNChange(e)}
            />
          </Form.Group>
          <div className="join-form">
            <p>Action Code:</p>
          </div>
          <Form.Group className="mb-3" >
            <Form.Control
              className="input-box"
              aria-label="Action Code"
              aria-describedby="basic-addon1"
              placeholder="Action Code"
              onChange={(e) => this.onCChange(e)}
            />
          </Form.Group>
          <br />
          <div className="join-btns">
            <Button
              type="submit"
              className="join-btn"
              onClick={() => {
                if (this.state.username === "") {
                  alert("Enter a Name!");
                  return;
                }
                this.props.joinGame(this.state.gameCode, this.state.username)
              }}
            >
              Join Game
            </Button>
            <span style={{ color: "white", marginTop: "30px", marginBottom: "10px", fontSize: "18px" }}>
              Or
            </span>
            <Button
              className="join-btn"
              onClick={() => this.props.createNewGame()}
              onTouchStart={() => this.props.createNewGame()}
              style={{ marginBottom: "15px" }}
            >
              Create New Game
            </Button>
          </div>
        </Form>
      </>
    );
  }


  renderForm() {
      return this.JoinForm();
      
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


export default Join;
