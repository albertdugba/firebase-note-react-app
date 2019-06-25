import React, { Component } from "react";

class FormError extends Component {
  render() {
    const { msgError } = this.props;
    return <div className="col-12 alert alert-danger px-3">{msgError}</div>;
  }
}

export default FormError;
