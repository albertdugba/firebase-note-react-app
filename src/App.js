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

  // componentDidMount() {
  //   const ref = firebase.database().ref("user");
  //   ref.on("value", snapshot => {
  //     let firebaseUser = snapshot.val();
  //     this.setState({ user: firebaseUser });
  //   });
  // }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({
          user: firebaseUser,
          userID: firebaseUser.uid,
          displayName: firebaseUser.displayName
        });
      }
    });
  }

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

  logOutUser = event => {
    event.preventDefault();
    this.setState({
      user: null,
      userID: null,
      displayName: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  render() {
    return (
      <div>
        <div>
          <Navbar userName={this.state.user} logOutUser={this.logOutUser} />
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
