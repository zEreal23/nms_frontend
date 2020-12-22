import React, { useState } from "react";

import { signup } from "../auth";
import Welcome from "../image/employee.png";
import "./Form.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <div className="form-content-right">
      <form onSubmit={clickSubmit} className="form" noValidate>
        {showSuccess()}
        {showError()}
        <h1>Create new Employees by filling out the information below.</h1>
        <div className="form-inputs">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>

        <button className="form-input-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created.
    </div>
  );

  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img-signup" src={Welcome} alt="spaceship" />
        </div>
        {signUpForm()}
      </div>
    </>
  );
};

export default Signup;
