import React, { Component } from "react";
import { navigate } from "@reach/router/lib/history";

import firebase from "./Firebase";
import FormError from "./FormError";

class RegisterForm extends Component {
  state = {
    displayName: "",
    email: "",
    passOne: "",
    passTwo: "",
    loading: false,
    errorMessage: null
  };

  onChangeHandler = event => {
    const target = event.target.name;
    const value = event.target.value;
    this.setState({ [target]: value });
    console.log(value);
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.state.passOne !== this.state.passTwo) {
      this.setState({ errorMessage: "Passwords do not match" });
    } else {
      this.setState({ errorMessage: null });
    }

    const registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.resgiterUser(registrationInfo.displayName);
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });

    navigate("/notes");
  };
  render() {
    const { loading } = this.state.loading;
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          {this.state.errorMessage !== null ? (
            <FormError
              errorAlertMsg={this.state.errorMessage}
              className="form-error"
            />
          ) : null}
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="displayName"
            value={this.state.displayName}
            onChange={this.onChangeHandler}
          />
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
            name="passOne"
            value={this.state.passOne}
            onChange={this.onChangeHandler}
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="passTwo"
            value={this.state.passTwo}
            onChange={this.onChangeHandler}
          />

          <button type="submit" className="submit" disabled={loading}>
            {loading && <i className="fas fa-sync-alt" />}
            add note
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
