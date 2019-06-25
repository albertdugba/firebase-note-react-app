import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";

import "../App.css";

class Notes extends Component {
  state = {
    noteInput: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log("Clicked...");
    this.props.addNote(this.state.noteInput);
    this.setState({ noteInput: "" });
  };
  render() {
    return (
      <div className="notes-page">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="noteInput"
            className="add-note"
            onChange={this.onChange}
            value={this.state.noteInput}
          />
          <button className="add-note">
            <FaPlus />
          </button>
        </form>

        <div />
      </div>
    );
  }
}

export default Notes;
