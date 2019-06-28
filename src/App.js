import React, { Component } from "react";
import { Router, navigate } from "@reach/router";

import firebase from "./components/Firebase";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Notes from "./components/Notes";
import Login from "./components/Login";

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
          userID: firebaseUser.uid,
          displayName: firebaseUser.displayName
        });
        // Create a reference to which the items are going to be stored under
        const notesRef = firebase
          .database()
          .ref(`notes/${this.state.firebaseUser.uid}`);
        // Get the value of the data
        notesRef.on("value", snapshot => {
          let notes = snapshot.val();
          // Set an empty array to which the notes are going to be stored
          let notesList = [];
          // Loop through and add to the array
          for (let item in notes) {
            notesList.push({
              noteID: item,
              notesName: notes[item].noteName
            });
          }
          // Update the state
          this.setState({
            notes: notesList,
            howManyNotes: notesList.length
          });
        });
      } else {
        this.setState({ displayName: null });
      }
    });
  }
  // Register user with the display name
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

  // Form for adding note
  addNotes = noteName => {
    const ref = firebase.database().ref(`/notes/${this.state.user.uid}`);
    ref.push({ noteName: noteName });
  };

  // Method for logging out users
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
          <Notes
            path="/notes"
            notes={this.state.notes}
            addNotes={this.addNotes}
          />
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default App;
