import React, { Component } from "react";
import firebase from "./Firebase";
import FormError from "./FormError";
import { navigate } from "@reach/router/lib/history";

class RegisterUser extends Component {
  state = {
    displayName: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    errorMsg: null,
    loading: false,
    errorTime: true
  };

  onTimeout = () => {
    this.setState({ errorTime: false });
  };

  onChange = event => {
    const target = event.target.name;
    const value = event.target.value;
    this.setState({ [target]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    //  Set state to loading...
    this.setState({ loading: true });
    if (this.state.passwordOne !== this.state.passwordTwo) {
      this.setState({ errorMsg: "Passwords do not match" });
    }

    const registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passwordOne
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(this.state.displayName);
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        if (error.message != null) {
          this.setState({ errorMsg: error.message });
        } else {
          this.setState({ errorMsg: null });
        }
      });

    navigate("/notes");
  };

  render() {
    const { errorTime } = this.props;
    return (
      <div>
        <h1 className="form-title">Registration Form</h1>
        <form onSubmit={this.onSubmit}>
          {this.state.errorMsg != null && (
            <FormError
              msgError={this.state.errorMsg}
              timeout={1000}
              onTimeout={this.onTimeout}
              errorTime={errorTime}
            />
          )}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={this.state.displayName}
            name="displayName"
            onChange={this.onChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.onChange}
            placeholder="Email"
          />

          <label htmlFor="name">Password</label>
          <input
            type="password"
            value={this.state.passwordOne}
            name="passwordOne"
            onChange={this.onChange}
            placeholder="Password"
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            value={this.state.passwordTwo}
            name="passwordTwo"
            onChange={this.onChange}
            placeholder="Confirm Password"
          />
          <button>{this.state.loading ? "Registering..." : "Register"}</button>
        </form>
      </div>
    );
  }
}

export default RegisterUser;
