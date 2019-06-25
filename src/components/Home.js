import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="home-container">
        <div>
          {" "}
          <h1>
            <i className="fas fa-pen" /> Note Taking Application
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
        {userName && (
          <Link to="/login" className="btn-link">
            All Notes
          </Link>
        )}
        {!userName && (
          <Link to="/register" className="btn-link">
            Register
          </Link>
        )}
      </div>
    );
  }
}

export default Home;
