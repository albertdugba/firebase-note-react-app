import React, { Component } from "react";

class NoteList extends Component {
  render() {
    const { notes } = this.props;
    const myNotes = notes.map(item => {
      return (
        <div className="list-group-item-d-flex" key={notes.notesID}>
          <p>{item.notesName}</p>
        </div>
      );
    });
    return <div>{myNotes}</div>;
  }
}

export default NoteList;
