import React, {useState } from "react";
import { Redirect } from "react-router-dom";

import { signin, authenticate } from "../auth";
import Welcome from "../image/IMG_7513.jpg";
import "./Form.css";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: false });
    signin({ email, password }).then((data) => {
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
      <form onSubmit={clickSubmit} className="form" noValidate>
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

        <button className="form-input-btn" type="submit">
          Login
        </button>
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
      return <Redirect to="/" />;
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

export default Signup;
