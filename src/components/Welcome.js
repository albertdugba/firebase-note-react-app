import React, { Component } from "react";

class Welcome extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="text-center container">
        <span>
          Welcome <strong>{userName}</strong>
        </span>
      </div>
    );
  }
}

export default Welcome;
