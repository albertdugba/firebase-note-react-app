import React, { Component } from "react";
import { FaReact } from "react-icons/fa";
import { Link } from "@reach/router";
import "../App.css";

class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;
    return (
      <div className="container">
        <div className="navbar">
          <Link to="/">
            {" "}
            <FaReact />
          </Link>

          <div>
            {user && (
              <Link to="/notes" className="nav-links">
                All Notes
              </Link>
            )}

            {user && (
              <Link
                to="/login"
                className="nav-links"
                onClick={event => logOutUser(event)}
              >
                Logout
              </Link>
            )}

            {!user && (
              <Link to="/registerform" className="nav-links">
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
