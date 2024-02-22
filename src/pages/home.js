import React, { Component } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  db,
} from "../firebase";
import { Button, Row, Col } from "react-bootstrap";
import { getDoc, doc } from "firebase/firestore";

class Home extends Component {
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
    //   this.props.didHome(user);
    // });

    // // Clean up the subscription when the component unmounts
    // return () => unsubscribe();
  }

  HomeForm() {
    return (
      <>
      <Container>
        <Row>
          <Col className="available-games">
            <h2>Available Games:</h2>
            <Card className="game-card">
              <span>Black vs. Jack</span>
              <Card.Footer className="text-muted">1 Vote</Card.Footer>
            </Card>
          </Col>
          <Col>
            <h2>Leaderboard</h2>
            <Card className="leaderboard-card">
              <Card className="leaderboard-item">
                Jack - 10 
              </Card>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="created-text">
              <h1>Action Code:</h1>
              <span className="action-code">3DG9</span>
              <h3>Players: 2</h3>
            </div>
          </Col>
          <Col className="game-countdown">
            <h2>
              Game Start in 10s...
            </h2>
          </Col>
        </Row>
      </Container>
      </>
    );
  }


  renderForm() {
      return this.HomeForm();
  }

  render() {
    return (
      <>
        <div style={{margin: "10px"}}>
          {this.renderForm()}
        </div>
      </>
    );
  }
}


export default Home;
