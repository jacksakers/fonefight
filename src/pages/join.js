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
      email: "",
      password: "",
      cPassword: "",
      first: "",
      last: "",
    };
  }

  async componentDidMount() {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // This function will be called whenever the authentication state changes
      this.props.didJoin(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
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

  async onJoinSubmit(e) {
    e.preventDefault();
    let _password = this.state.password;
    await logInWithEmailAndPassword(this.state.email, _password);
    if (auth.currentUser) this.props.didJoin(await this.getUserName());
  }

  async getUserName() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().name;
    } else {
      return "GUEST";
    }
  }

  async onSignUpSubmit(e) {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    let name = this.state.first + " " + this.state.last;
    if (this.state.password !== this.state.cPassword) {
      alert("Whoops, the passwords do not match!");
      return;
    }
    await registerWithEmailAndPassword(name, email, password);
    if (auth.currentUser) this.props.didJoin(name);
  }

  JoinForm() {
    return (
      <>
        <Form onSubmit={(e) => this.onJoinSubmit(e)}>
          <div className="join-form">
            <p>Action Code:</p>
          </div>
          <Form.Group className="mb-3" >
            <Form.Control
              className="input-box"
              aria-label="Action Code"
              aria-describedby="basic-addon1"
              placeholder="Action Code"
              onChange={(e) => this.onEChange(e)}
            />
          </Form.Group>
          <br />
          <div className="join-btns">
            <Button
              type="submit"
              className="join-btn"
              onClick={() => {
                console.log("POST THAT!");
              }}
            >
              Join Game
            </Button>
            <span style={{ color: "white", marginTop: "30px", marginBottom: "10px", fontSize: "18px" }}>
              Or
            </span>
            <Button
              className="join-btn"
              onClick={() => this.setState({ newUser: true })}
              onTouchStart={() => this.setState({ newUser: true })}
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
    if (!this.state.newUser) {
      return this.JoinForm();
    } else {
      this.props.createNewGame();
    }
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
