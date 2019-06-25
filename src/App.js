import React, { Component } from "react";
import { Router } from "@reach/router";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";

class App extends Component {
  state = {
    user: null
  };
  render() {
    return (
      <div>
        <div>
          <Navbar userName={this.state.user} />
          {this.state.user && <Welcome userName={this.state.user} />}
        </div>

        <Home path="/" />
      </div>
    );
  }
}

export default App;
