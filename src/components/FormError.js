import React, { Component } from "react";

class FormError extends Component {
  render() {
    const { errorAlertMsg } = this.props;
    return <div>{errorAlertMsg}</div>;
  }
}

export default FormError;
