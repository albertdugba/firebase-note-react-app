import React, { Component } from "react";
import { navigate } from "@reach/router/lib/history";

import FormError from "./FormError";
import firebase from "./Firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errorMsg: null
  };

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const signedInInfo = {
      email: this.state.email,
      password: this.state.password
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(signedInInfo.email, signedInInfo.password)
      .then(() => {
        navigate("/notes");
      })
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        if (error.message != null) {
          this.setState({ errorMsg: error.message });
        } else {
          this.setState({ errorMsg: null });
        }
      });
  };

  render() {
    return (
      <div>
        <h1 className="form-title">
          <i className="fas fa-user" /> Login Form
        </h1>
        <form onSubmit={this.onSubmit}>
          {this.state.errorMsg != null && (
            <FormError
              msgError={this.state.errorMsg}
              timeout={1000}
              onTimeout={this.onTimeout}
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

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            placeholder="Password"
          />
          <button>
            {this.state.loading ? <p>Logging in... </p> : "Log In"}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
