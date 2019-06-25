import React, { Component } from "react";
import { Router, navigate } from "@reach/router";

import firebase from "./components/Firebase";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Welcome from "./components/Welcome";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Notes from "./components/Notes";

class App extends Component {
  state = {
    user: null,
    userID: null,
    displayName: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({
          user: firebaseUser,
          displayName: firebaseUser.displayName,
          userID: firebaseUser.uid
        });
      }
    });
  }

  resgiterUserHandler = userName => {
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

  logOutUser = event => {
    event.preeventDefault();
    this.setState({
      displayName: null,
      user: null,
      userID: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  // Add Note
  addNoteHandler = inputValue => {
    const ref = firebase.database.ref(`notes/${this.state.user.uid}`);
    ref.push({ inputValue: inputValue });
    console.log(inputValue);
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome
            user={this.state.displayName}
            logOutUser={event => this.logOutUser(event)}
          />
        )}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <RegisterForm
            path="/registerform"
            resgiterUser={this.resgiterUserHandler}
          />
          <Notes path="/notes" addNote={this.addNoteHandler} />
        </Router>
      </div>
    );
  }
}

export default App;
