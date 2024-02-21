import "./App.css";
import NewNavbar from "./components/newnavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { db, auth, logout } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Join from "./pages/join";
import Create from "./pages/create";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "join",
      isLoggedIn: false,
      username: "GUEST",
      currentEvent: "example",
      uid: "",
    };
  }

  componentDidMount() {
    // Read query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const pageTitle = params.get("page");
    var uidParam = params.get("uid");
    var oidParam = params.get("oid");
    var eventParam = params.get("eventid");

    // If there is a 'page' query parameter, navigate to the corresponding page
    if (pageTitle) {
      if (!uidParam) uidParam = auth.currentUser ? auth.currentUser.uid : "";
      if (!oidParam) oidParam = "DNE";
      this.setState({
        currentPage: pageTitle,
        uid: uidParam,
        oid: oidParam,
        currentEvent: eventParam,
      });
      this.renderContent();
    }
  }

  handleLogIn(uName) {
    this.setState({ isLoggedIn: true, username: uName });
  }

  handleLogOut() {
    console.log("logging out");
    this.setState({ currentPage: "home" });
  }

  handleNewGame(newEvent) {
    this.setState({ currentPage: "create" });
  }

  handleGoToJoin() {
    this.updateParams("page=join");
    this.setState({ currentPage: "join" });
  }

  renderContent() {
    switch (this.state.currentPage) {
      case "join":
        // this.updateParams("page=join");
        return <Join didJoin={() => console.log("joined")} 
                    createNewGame={() => this.handleNewGame()}/>;
      case "create":
        this.updateParams("page=create");
        return <Create didCreate={() => console.log("joined")} 
                    goToJoin={() => this.handleGoToJoin()}/>;
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
