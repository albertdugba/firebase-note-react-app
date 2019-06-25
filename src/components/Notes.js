import React, { Component } from "react";

import "../App.css";

class Notes extends Component {
  state = {
    noteName: ""
  };

  onChange = event => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.addNotes(this.state.noteName);
    this.setState({ noteName: "" });
  };
  render() {
    return (
      <div className="text-center all-notes">
        All Notes
        <form className="add-form" onSubmit={this.onSubmit}>
          <input
            name="noteName"
            type="text"
            placeholder="Add a note..."
            value={this.state.noteName}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}

export default Notes;
