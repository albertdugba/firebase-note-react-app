import React, { Component } from "react";
import NoteList from "./NoteList";

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
      <div>
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

        <div className="output">
          {this.props.notes && this.props.notes.length ? (
            <div className="note-list">
              <h4>Note from Firebase</h4>
            </div>
          ) : (
            "No Notes Found"
          )}

          {this.props.notes && (
            <div className="list-group">
              <NoteList notes={this.props.notes} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Notes;
