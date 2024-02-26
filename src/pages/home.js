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
  

  parseJSONToCards = (data) => {
    if (!data) return "No Players";
    return Object.keys(data).map((username, index) => (
        <Card className="leaderboard-item">
            {username} - {data[username]}
        </Card>
    ));
  };

  HomeForm() {
    return (
      <>
      <Container>
        <Row>
          <Col className="available-games">
            <h2>Available Games:</h2>
            <Card className="game-card">
              <span>Black vs. Jack</span>
              <Card.Footer className="text-muted">{(this.props.choices) ? this.props.choices.BVJ : "No"} Vote</Card.Footer>
              {/* <Card.Footer className="text-muted">{this.props.choices.BVJ} Vote</Card.Footer> */}
            </Card>
          </Col>
          <Col>
            <h2>Leaderboard</h2>
            <Card className="leaderboard-card">
                {this.parseJSONToCards(this.props.players)}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="created-text">
              <h1>Action Code:</h1>
              <span className="action-code">{this.props.actionCode}</span>
              <h3>Players: {this.props.playeramount}</h3>
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
