import React, {useState } from "react";
import { Redirect } from "react-router-dom";
import {Button} from 'antd'

import { signin, authenticate, isAuthenticated } from "../auth";
import Welcome from "../image/IMG_7513.jpg";
import "./Form.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const {user} = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: false });
    signin({ email , password}).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
            error: ""
          });
        });
      }
    });
  };

  const signInForm = () => (
    <div className="form-content-right">
      {showLoading()}
      {showError()}
      <form className="form" noValidate>
        <h1>You can login by filling out the information below.</h1>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>

        <Button 
          className="form-input-btn" 
          type="submit" disabled={!email || password.length < 6}
          onClick={clickSubmit}>
          Login
        </Button>
        {redirectUser()}
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if(user && user.role === 1) {
        return <Redirect to="/home/admin"/>
      } else {
        return <Redirect to="/"/>
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={Welcome} alt="spaceship" />
        </div>
        {signInForm()}
      </div>
    </>
  );
};

export default Signin;
