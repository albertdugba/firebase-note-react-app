import React, { Component } from "react";

import firebase from "./Firebase";
import FormError from "./FormError";
import "../App.css";
import { navigate } from "@reach/router/lib/history";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  onChangeHandler = event => {
    const target = event.target.name;
    const value = event.target.value;
    this.setState({ [target]: value });
    console.log(target.value);
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate("/notes");
      })
      .catch(error => {
        if (error.message != null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          {this.state.errorMessage !== null ? (
            <FormError
              errorAlertMsg={this.state.errorMessage}
              className="form-error"
            />
          ) : null}

          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />

          <button type="submit" className="submit">
            login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
