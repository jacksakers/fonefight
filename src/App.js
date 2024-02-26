import "./App.css";
import NewNavbar from "./components/newnavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { db, auth, logout, database } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, set, push, onValue, child, update, increment, get } from "firebase/database";
import Join from "./pages/join";
import Create from "./pages/create";
import Home from "./pages/home";
import { data } from "autoprefixer";
import Player from "./pages/player";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "join",
      isLoggedIn: false,
      username: "GUEST",
      currentEvent: "example",
      uid: "",
      actionCode: "",
      players: {}
    };
  }

  componentDidMount() {
    // Read query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const pageTitle = params.get("page");
    var uidParam = params.get("username");
    var oidParam = params.get("oid");
    var eventParam = params.get("eventid");
    var gameCode = params.get("game")

    // If there is a 'page' query parameter, navigate to the corresponding page
    if (pageTitle) {
      this.setState({
        currentPage: pageTitle,
        username: uidParam,
        oid: oidParam,
        currentEvent: eventParam,
        actionCode: gameCode
      });
      this.renderContent();
    }
  }

  generateActionCode() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    var code = '';
    for (var i = 0; i < 4; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    code = code.toUpperCase();
    this.setState({actionCode: code});
    return code;
  }
  
  async handleNewGame() {
    await set(ref(database, 'games/' + this.generateActionCode()), {
      playeramount: 0,
      gamepage: "main",
      players: {},
      choices: {"BVJ": 0}
    });
    this.handleStartGame();    
  }
  

  handleJoinGame(code, username) {
    // const gameRef = ref(database, 'games/' + code);
    
    const updates = {};
    // this.setState({players: {`${username}`: 0}})
    updates['games/' + code + '/players/' + username] = 0;
    updates['games/' + code + '/playeramount'] = increment(1);
    
    this.updateParams(`page=player&game=${code}&username=${username}`);
    this.setState({ currentPage: "player", actionCode: code });
    return update(ref(database), updates);
  }

  handleStartGame() {
    this.updateParams(`page=home&game=${this.state.actionCode}`);
    this.setState({ currentPage: "home" });
  }

  handleGoToJoin() {
    this.updateParams("page=join");
    this.setState({ currentPage: "join" });
  }

  listenToGame() {
    onValue(ref(database, 'games/' + this.state.actionCode), (snapshot) => {
      this.setState({players: snapshot.val().players,
                      playeramount: snapshot.val().playeramount,
                      choices: snapshot.val().choices,});
      // console.log(snapshot.val().players);
    });
  }

  gameVote(code, voteID) {

    if (voteID === "BVJ") {
      const updates = {};
      updates['games/' + code + '/choices/BVJ'] = increment(1);
      return update(ref(database), updates);
    }
  }

  renderContent() {
    switch (this.state.currentPage) {
      case "join":
        // this.updateParams("page=join");
        return <Join joinGame={(code,username) => this.handleJoinGame(code.toUpperCase(),username)} 
                    createNewGame={() => this.handleNewGame()}/>;
      case "create":
        this.updateParams("page=create");
        return <Create didCreate={() => console.log("joined")} 
                    actionCode = {this.state.actionCode}
                    goToJoin={() => this.handleGoToJoin()}
                    startGame={() => this.handleStartGame()}/>;
      case "home":
        this.listenToGame();
        return <Home actionCode={this.state.actionCode}
                      playeramount={this.state.playeramount}
                      players={this.state.players}
                      choices={this.state.choices}/>;
      case "player":
        return <Player gameVote={(code, voteID) => this.gameVote(code, voteID)}
                      actionCode={this.state.actionCode}/>;
      default:
        return <></>;
    }
  }

  updateParams(newParams) {
    // Get the current pathname
    const pathname = window.location.pathname;

    // Combine the current pathname and the new parameters
    const search = newParams ? `?${newParams}` : "";
    const newPath = `${pathname}${search}`;

    // Use the replaceState method to update the URL without adding a new entry to the browser's history
    window.history.replaceState(null, null, newPath);
  }

  switchPageTo(newPage) {
    this.setState({ currentPage: newPage });
    if (newPage === "profile") {
      this.updateParams(`page=account&uid=${this.state.uid}`);
      return;
    }
    this.updateParams(`page=${newPage}`);
  }

  render() {
    return (
      <div className="App">
        <NewNavbar switchPageTo={this.switchPageTo.bind(this)} />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
