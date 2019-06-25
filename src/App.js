import React, { Component } from "react";
import { Router, navigate } from "@reach/router";

import firebase from "./components/Firebase";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Notes from "./components/Notes";

class App extends Component {
  state = {
    user: null,
    userID: null,
    displayName: null
  };

  componentDidMount() {
    const ref = firebase.database().ref("user");
    ref.on("value", snapshot => {
      let firebaseUser = snapshot.val();
      this.setState({ user: firebaseUser });
    });
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(firebaseUser => {
  //     if (firebaseUser) {
  //       this.setState({});
  //     }
  //   });
  // }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      firebaseUser
        .updateProfile({
          displayName: userName
        })
        .then(() => {
          this.setState({
            user: firebaseUser,
            displayName: firebaseUser.displayName,
            userID: firebaseUser.uid
          });
          navigate("/notes");
        });
    });
  };

  addNotes = noteName => {
    console.log(noteName);
  };

  render() {
    return (
      <div>
        <div>
          <Navbar userName={this.state.user} />
          {this.state.user && <Welcome userName={this.state.displayName} />}
        </div>
        <Router>
          <Home path="/" />
          <RegisterUser path="/register" registerUser={this.registerUser} />
          <Notes path="/notes" addNotes={this.addNotes} />
        </Router>
      </div>
    );
  }
}

export default App;
