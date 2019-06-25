import React, { Component } from "react";
import { Link } from "@reach/router";

import "../App.css";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="showcase">
        <h1>Note Taking Application</h1>
        <div className="showcase-grid">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's' standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div>
            {user && (
              <Link to="/notes" className="btn-links">
                All Notes
              </Link>
            )}
            {!user && (
              <Link to="/registerform" className="btn-links">
                Register
              </Link>
            )}
            {!user && (
              <Link to="/login" className="btn-links">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
