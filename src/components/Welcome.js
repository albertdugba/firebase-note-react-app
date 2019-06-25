import React, { Component } from "react";
import "../App.css";

class Welcome extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="centered">
        Welcome <strong>{user}</strong>
      </div>
    );
  }
}

export default Welcome;
