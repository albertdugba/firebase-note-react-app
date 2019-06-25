import React, { Component } from "react";
import { Router } from "@reach/router";

import firebase from "./components/Firebase";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const ref = firebase.database().ref("user");
    ref.on("value", snapshot => {
      let firebaseUser = snapshot.val();
      this.setState({ user: firebaseUser });
    });
  }

  render() {
    return (
      <div>
        <div>
          <Navbar userName={this.state.user} />
          {this.state.user && <Welcome userName={this.state.user} />}
        </div>
        <Router>
          <Home path="/" />
          <RegisterUser path="/register" />
        </Router>
      </div>
    );
  }
}

export default App;
