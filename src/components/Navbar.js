import React, { Component } from "react";
import { Link } from "@reach/router";
import "../App.css";

class Navbar extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="main-header">
        <div className="brand">
          <Link to="/">
            <i className="fas fa-clipboard " />
            {""}
            Note app
          </Link>
        </div>
        <div className="nav-items">
          {userName && <Link to="/notes">ALl Notes</Link>}
          {userName && <Link to="/login">Logout</Link>}
          {!userName && <Link to="/register">Register</Link>}
        </div>
      </div>
    );
  }
}

export default Navbar;
