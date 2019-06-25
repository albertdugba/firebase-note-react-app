import React, { Component } from "react";

class RegisterUser extends Component {
  render() {
    return (
      <div>
        <h1 className="form-title">Registration Form</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" />
          <label htmlFor="email">Email</label>
          <input type="email" />
          <label htmlFor="name">Password</label>
          <input type="password" />
          <label htmlFor="password">Confirm Password</label>
          <input type="password" />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterUser;
